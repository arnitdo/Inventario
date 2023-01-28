import {Request, Response, Router} from "express";
import {db} from "../utils/db";
import {requireBodyParams, requireURLParams} from "../utils/middleware";

const skuRouter = Router({
	mergeParams: true
})

async function createSku(req: Request, res: Response){
	try {
		const {orgId} = req.params

		const {skuId, skuName, skuDescription, skuValue} = req.body

		await db.query(
			"INSERT INTO skus VALUES ($1, $2, $3, $4, $5)",
			[orgId, skuId, skuName, skuDescription, skuValue]
		)

		res.status(200).json({
			"status": "SUCCESS"
		})
	} catch (err){
		console.error(err)
		res.status(503).json({
			"status": "ERR_INTERNAL_ERROR"
		})
	}
}

async function getSkus(req: Request, res: Response){
	try {
		const {orgId} = req.params

		const skuPage = req.query.skuPage || "1"

		const parsedSkuPage = Number.parseInt(skuPage as string)

		const skuPageOffset = ((Number.isNaN(parsedSkuPage) ? 1 : parsedSkuPage) - 1) * 10

		const {rows} = await db.query(
			"SELECT * FROM skus WHERE org_id = $1 OFFSET $2 LIMIT 10",
			[orgId, skuPageOffset]
		)

		res.status(200).json({
			"status": "SUCCESS",
			"skuData": rows
		})
	} catch (err){
		console.error(err)
		res.status(503).json({
			"status": "ERR_INTERNAL_ERROR"
		})
	}
}

async function updateSku(req: Request, res: Response){
	try {
		await db.query("BEGIN")

		const {orgId, skuId} = req.params
		const {skuName: newSkuName, skuDescription: newSkuDescription, skuValue: newSkuValue} = req.body

		const {rows: oldData} = await db.query(
			"SELECT * FROM skus WHERE org_id = $1 AND sku_id = $2",
			[orgId, skuId]
		)

		if (oldData.length == 0){
			res.status(400).json({
				"status": "ERR_INVALID_PARAMS",
				"invalidParams": ["skuId"]
			})
			return
		}

		const {sku_name: skuName, sku_description: skuDescription, sku_value: skuValue} = oldData[0]

		const finalSkuData = {
			skuName: newSkuName || skuName,
			skuDescription: newSkuDescription || skuDescription,
			skuValue: newSkuValue || skuValue
		}

		const {skuName: finalSkuName, skuDescription: finalSkuDescription, skuValue: finalSkuValue} = finalSkuData

		await db.query(
			"UPDATE skus SET sku_name = $1, sku_description = $2, sku_value = $3 WHERE sku_id = $4",
			[finalSkuName, finalSkuDescription, finalSkuValue, skuId]
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

skuRouter.post(
	"/",
	[
		requireBodyParams("skuId", "skuName", "skuDescription", "skuValue")
	],
	createSku
)

skuRouter.get(
	"/",
	getSkus
)

skuRouter.put(
	"/:skuId/",
	[
		requireURLParams("skuId")
	],
	updateSku
)

export {
	skuRouter
}