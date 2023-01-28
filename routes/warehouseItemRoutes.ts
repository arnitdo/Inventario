import {Request, Response, Router} from "express";
import {db} from "../utils/db";
import {requireBodyParams, requireURLParams} from "../utils/middleware";

const warehouseItemRouter = Router({
	mergeParams: true
})

async function addItem(req: Request, res: Response){
	try {
		const {orgId, warehouseId} = req.params
		const {skuId, itemQuantity} = req.body

		await db.query("BEGIN")

		const {rows: checkExistingRows} = await db.query(
			"SELECT 1 FROM warehouse_items WHERE org_id = $1 AND warehouse_id = $2 AND sku_id = $3",
			[orgId, warehouseId, skuId]
		)

		if (checkExistingRows.length > 0){
			await updateItem(req, res)
			return
		}

		await db.query(
			"INSERT INTO warehouse_items VALUES ($1, $2, $3, $4)",
			[orgId, warehouseId, skuId, itemQuantity]
		)

		await db.query(
			"INSERT INTO warehouse_logs VALUES ($1, $2, 'UPDATE', $3, $4, $5, NOW())",
			[orgId, skuId, itemQuantity, warehouseId, warehouseId]
		)

		await db.query("COMMIT")

		res.status(200).json({
			"status": "SUCCESS"
		})
	} catch (err){
		await db.query("ROLLBACK")
		console.error(err)
		res.status(503).json({
			"status": "ERR_INTERNAL_ERROR"
		})
	}
}

async function updateItem(req: Request, res: Response){
	try {
		const {orgId, warehouseId} = req.params
		let {skuId, itemQuantity} = req.body

		await db.query("BEGIN")

		await db.query(
			"UPDATE warehouse_items SET quantity = $1 WHERE sku_id = $2 AND warehouse_id = $3 AND org_id =  $4",
			[itemQuantity, skuId, warehouseId, orgId]
		)

		await db.query(
			"INSERT INTO warehouse_logs VALUES ($1, $2, 'UPDATE', $3, $4, $5, NOW())",
			[orgId, skuId, itemQuantity, warehouseId, warehouseId]
		)

		await db.query("COMMIT")

		res.status(200).json({
			"status": "SUCCESS"
		})
	} catch (err){
		await db.query("ROLLBACK")
		console.error(err)
		res.status(503).json({
			"status": "ERR_INTERNAL_ERROR"
		})
	}
}

async function getWarehouseItems(req: Request, res: Response){
	try {
		const {orgId, warehouseId} = req.params

		const itemsPage = req.query.itemsPage as string || "1"
		const parsedItemsPage = Number.parseInt(itemsPage)
		const itemsOffset = (
			(Number.isNaN(parsedItemsPage) ? 1 : parsedItemsPage) - 1
		) * 10

		const {rows} = await db.query(
			"SELECT warehouse_items.*, skus.sku_name, skus.sku_description, skus.sku_value FROM warehouse_items JOIN skus ON warehouse_items.sku_id = skus.sku_id AND warehouse_items.org_id = skus.org_id WHERE warehouse_items.org_id = $1 AND warehouse_id = $2 OFFSET $3 LIMIT 10",
			[orgId, warehouseId, itemsOffset]
		)

		res.status(200).json({
			"status": "SUCCESS",
			"warehouseItems": rows
		})
	} catch (err){
		console.error(err)
		res.status(503).json({
			"status": "ERR_INTERNAL_ERROR"
		})
	}
}

warehouseItemRouter.post(
	"",
	[
		requireBodyParams("skuId", "itemQuantity")
	],
	addItem
)

warehouseItemRouter.put(
	"",
	[
		requireBodyParams("skuId", "itemQuantity")
	],
	updateItem
)

warehouseItemRouter.get(
	"",
	getWarehouseItems
)

export {warehouseItemRouter}