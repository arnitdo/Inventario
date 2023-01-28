import {Request, Response, Router} from "express";
import {db} from "../utils/db";
import {requireBodyParams, requireURLParams} from "../utils/middleware";
import {warehouseItemRouter} from './warehouseItemRoutes'

const warehouseRouter = Router({
	mergeParams: true
})

async function createWarehouse(req: Request, res: Response){
	try {
		await db.query("BEGIN")

		const {orgId} = req.params
		const {warehouseId} = req.body

		await db.query(
			"INSERT INTO org_warehouses VALUES ($1, $2)",
			[orgId, warehouseId]
		)

		await db.query("COMMIT")

		res.status(200).json({
			"status": "SUCCESS"
		})
	} catch (err){
		console.error(err)
		await db.query("ROLLBACK")
		res.status(503).json({
			"status": "ERR_INTERNAL_ERROR"
		})
	}
}

async function getOrgWarehouses(req: Request, res: Response){
	try {
		const {orgId} = req.params
		const {rows} = await db.query(
			"SELECT warehouse_id FROM org_warehouses WHERE org_id = $1",
			[orgId]
		)

		const filteredRows: string[] = rows.reduce((prevArr, row) => {

			return [...prevArr, row.warehouse_id as string]
		}, [])

		res.status(200).json({
			"status": "SUCCESS",
			"orgWarehouses": filteredRows
		})
	} catch (err){
		console.error(err)
		res.status(503).json({
			"status": "ERR_INTERNAL_ERROR"
		})
	}
}

async function transferWarehouseStock(req: Request, res: Response){
	try {
		const {orgId} = req.params
		const {sourceWarehouseId, destinationWarehouseId} = req.body
		let {skuId, itemQuantity} = req.body

		const {rows: sourceRows} = await db.query(
			"SELECT quantity FROM warehouse_items WHERE org_id = $1 AND sku_id = $2 AND warehouse_id = $3",
			[orgId, skuId, sourceWarehouseId]
		)

		const sourceQuantity = sourceRows[0]?.quantity || -1

		itemQuantity = Number.parseInt(itemQuantity)

		if (sourceQuantity < itemQuantity){
			res.status(400).json({
				"status": "ERR_INVALID_PARAMS",
				"invalidParams": ["skuId", "itemQuantity"]
			})
			return
		}

		await db.query("BEGIN")

		await db.query(
			"UPDATE warehouse_items SET quantity = quantity - $1 WHERE org_id = $2 AND warehouse_id = $3 AND sku_id = $4",
			[itemQuantity, orgId, sourceWarehouseId, skuId]
		)

		const {rows: destinationRows} = await db.query(
			"SELECT quantity FROM warehouse_items WHERE org_id = $1 AND warehouse_id = $2 AND sku_id = $3",
			[orgId, destinationWarehouseId, skuId]
		)

		if (destinationRows.length == 0){
			await db.query(
				"INSERT INTO warehouse_items VALUES ($1, $2, $3, $4)",
				[orgId, destinationWarehouseId, skuId, itemQuantity]
			)
		} else {
			await db.query(
				"UPDATE warehouse_items SET quantity = quantity + $1 WHERE org_id = $2 AND warehouse_id = $3 AND sku_id = $4",
				[itemQuantity, orgId, destinationWarehouseId, skuId]
			)
		}

		await db.query(
			"INSERT INTO warehouse_logs VALUES ($1, $2, 'TRANSFER', $3, $4, $5, NOW())",
			[orgId, skuId, itemQuantity, sourceWarehouseId, destinationWarehouseId]
		)

		await db.query("COMMIT")

		res.status(200).json({
			"status": "SUCCESS"
		})

	} catch (err){
		console.error(err)
		await db.query("ROLLBACK")
		res.status(503).json({
			"status": "ERR_INTERNAL_ERROR"
		})
	}
}

async function getWarehouseLogs(req: Request, res: Response){
	try {
		const {orgId, warehouseId} = req.params
		const logPage = req.query.logPage as string || "1"
		const parsedLogPage = Number.parseInt(logPage)
		const logOffset = ((Number.isNaN(parsedLogPage) ? 1 : parsedLogPage) - 1) * 10

		const {rows} = await db.query(
			"SELECT * FROM warehouse_logs WHERE org_id = $1 AND (destination_warehouse = $2 OR source_warehouse = $3)",
			[orgId, warehouseId, warehouseId]
		)

		res.status(200).json({
			status: "SUCCESS",
			logData: rows
		})
	} catch (err){
		console.error(err)
		await db.query("ROLLBACK")
		res.status(503).json({
			"status": "ERR_INTERNAL_ERROR"
		})
	}
}

async function getWarehouseAnalytics(req: Request, res: Response){
	try {
		const {orgId, warehouseId} = req.params

		const {rows: leastUpdatedItems} = await db.query(
			"SELECT sku_id, COUNT(sku_id) AS sku_update_count FROM warehouse_logs GROUP BY sku_id HAVING sku_id IN (SELECT sku_id FROM warehouse_logs WHERE org_id = $1 AND (source_warehouse = $2 OR destination_warehouse = $3)) ORDER BY sku_update_count ASC LIMIT 3",
			[orgId, warehouseId, warehouseId]
		)

		const {rows: mostUpdatedItems} = await db.query(
			"SELECT sku_id, COUNT(sku_id) AS sku_update_count FROM warehouse_logs GROUP BY sku_id HAVING sku_id IN (SELECT sku_id FROM warehouse_logs WHERE org_id = $1 AND (source_warehouse = $2 OR destination_warehouse = $3)) ORDER BY sku_update_count DESC LIMIT 3",
			[orgId, warehouseId, warehouseId]
		)

		const {rows: outOfStockItems} = await db.query(
			"SELECT sku_id FROM warehouse_items WHERE org_id = $1 AND warehouse_id = $2 AND quantity = 0",
			[orgId, warehouseId]
		)

		const {rows: warehouseValuation} = await db.query(
			"SELECT SUM(skus.sku_value * warehouse_items.quantity) AS warehouse_evaluation FROM warehouse_items JOIN skus on skus.org_id = warehouse_items.org_id AND skus.org_id = $1 and skus.sku_id = warehouse_items.sku_id AND warehouse_items.warehouse_id = $2",
			[orgId, warehouseId]
		)

		const warehouseValue = warehouseValuation[0].warehouse_evaluation
		res.status(200).json({
			"status": "SUCCESS",
			...{
				leastUpdatedItems,
				mostUpdatedItems,
				outOfStockItems,
				warehouseValue
			}
		})
	} catch (err){
		console.error(err)
		res.status(503).json({
			"status": "ERR_INTERNAL_ERROR"
		})
	}
}

warehouseRouter.post(
	"",
	[
		requireBodyParams("warehouseId")
	],
	createWarehouse
)

warehouseRouter.get(
	"",
	getOrgWarehouses
)

warehouseRouter.post(
	"/transfer",
	[
		requireBodyParams(
			"sourceWarehouseId", "destinationWarehouseId", "skuId", "itemQuantity"
		)
	],
	transferWarehouseStock
)

warehouseRouter.get(
	"/:warehouseId/logs",
	[
		requireURLParams("warehouseId")
	],
	getWarehouseLogs
)

warehouseRouter.get(
	"/:warehouseId/analytics",
	[
		requireURLParams("warehouseId")
	],
	getWarehouseAnalytics
)

warehouseRouter.use(
	"/:warehouseId/items",
	[
		requireURLParams("warehouseId")
	],
	warehouseItemRouter
)

export {
	warehouseRouter
}