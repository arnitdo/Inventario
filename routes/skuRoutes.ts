import {Request, Response, Router} from "express";
import {db} from "../utils/db";
import {requireBodyParams} from "../utils/middleware";

const skuRouter = Router({
	mergeParams: true
})

async function createSku(req: Request, res: Response){
	try {
		const {orgId} = req.params

		const {skuId, skuName, skuDescription} = req.body

		await db.query(
			"INSERT INTO skus VALUES ($1, $2, $3, $4)",
			[orgId, skuId, skuName, skuDescription]
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

skuRouter.post(
	"/",
	[
		requireBodyParams("skuId", "skuName", "skuDescription")
	],
	createSku
)

skuRouter.get(
	"/",
	getSkus
)

export {
	skuRouter
}