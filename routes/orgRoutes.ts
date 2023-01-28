import {Router, Request, Response} from "express";
import {requireBodyParams, requireURLParams} from "../utils/middleware";
import {db} from "../utils/db";
import {skuRouter} from "./skuRoutes";
import {warehouseRouter} from "./warehouseRoutes";

const orgRouter = Router({
	mergeParams: true
})

/**
 *	@description Creates a new organization as well as an admin account
 **/
async function createOrganization(req: Request, res: Response){
	try {
		const {orgId, adminId, adminPassword} = req.body

		await db.query("BEGIN;")

		await db.query(
			"INSERT INTO organizations VALUES ($1)",
			[orgId]
		)

		await db.query(
			"INSERT INTO users VALUES ($1, $2, $3, 'ADMINISTRATOR')",
			[orgId, adminId, adminPassword]
		)

		await db.query("COMMIT;")

		res.status(200).json({
			"status": "SUCCESS"
		})

	} catch (err){
		console.error(err)
		await db.query("ROLLBACK;")
		res.status(503).json({
			"status": "ERR_INTERNAL_ERROR"
		})
	}
}

async function loginUser(req: Request, res: Response){
	try {
		const {userId, userPassword} = req.body
		const {orgId} = req.params

		const {rows} = await db.query(
			"SELECT user_id, password, role FROM users WHERE org_id = $1 AND user_id = $2",
			[orgId, userId]
		)

		if (rows.length == 0){
			res.status(400).json({
				"status": "ERR_INVALID_PARAMS",
				"invalidParams": ["orgId", "userId", "userPassword"]
			})
		} else {
			const {password, role} = rows[0]
			if (password === userPassword){
				res.status(200).json({
					status: "SUCCESS",
					authDetails: {
						orgId: orgId,
						userRole: role
					}
				})
			}
		}

	} catch (err){
		console.error(err)
		res.status(503).json({
			"status": "ERR_INTERNAL_ERROR"
		})
	}
}

async function getOrgUsers(req: Request, res: Response){
	try {
		const {orgId} = req.params
		const userPage = Number.parseInt(req.query.userPage as string || "1")

		const userPageOffset = ((Number.isNaN(userPage) ? 1 : userPage) - 1) * 10

		const {rows: userData} = await db.query(
			"SELECT * FROM users WHERE org_id = $1 OFFSET $2 LIMIT 10",
			[orgId, userPageOffset]
		)

		res.status(200).json({
			"status": "SUCCESS",
			"userData": userData
		})
	} catch (err){
		console.error()
		res.status(503).json({
			"status": "ERR_INTERNAL_ERROR"
		})
	}
}

async function createOrgUser(req: Request, res: Response){
	try {
		const {orgId} = req.params
		const {userId, userPassword, userRole} = req.body

		await db.query("BEGIN")

		await db.query(
			"INSERT INTO users VALUES ($1, $2, $3, $4)",
			[orgId, userId, userPassword, userRole]
		)

		await db.query("COMMIT")

		res.status(200).json({
			status: "SUCCESS"
		})
	} catch (err){
		console.error(err)
		res.status(503).json({
			"status": "ERR_INTERNAL_ERROR"
		})
	}
}

async function getOrgAnalytics(req: Request, res: Response){
	try {
		const {orgId} = req.params

		const {rows: leastUpdatedItems} = await db.query(
			"SELECT sku_id, COUNT(sku_id) AS sku_update_count FROM warehouse_logs GROUP BY sku_id HAVING sku_id IN (SELECT sku_id FROM warehouse_logs WHERE org_id = $1) ORDER BY sku_update_count ASC LIMIT 3",
			[orgId]
		)

		const {rows: mostUpdatedItems} = await db.query(
			"SELECT sku_id, COUNT(sku_id) AS sku_update_count FROM warehouse_logs GROUP BY sku_id HAVING sku_id IN (SELECT sku_id FROM warehouse_logs WHERE org_id = $1) ORDER BY sku_update_count DESC LIMIT 3",
			[orgId]
		)

		const {rows: outOfStockItems} = await db.query(
			"SELECT sku_id FROM warehouse_items WHERE org_id = $1 AND quantity = 0",
			[orgId]
		)

		const {rows: orgValuation} = await db.query(
			"SELECT SUM(skus.sku_value * warehouse_items.quantity) AS org_valuation FROM warehouse_items JOIN skus on skus.org_id = warehouse_items.org_id AND skus.org_id = $1 and skus.sku_id = warehouse_items.sku_id",
			[orgId]
		)

		const warehouseValue = orgValuation[0].org_valuation
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

orgRouter.post(
	"",
	[
		requireBodyParams("orgId", "adminId", "adminPassword")
	],
	createOrganization
)

orgRouter.post(
	"/:orgId/login",
	[
		requireURLParams("orgId"),
		requireBodyParams( "userId", "userPassword")
	],
	loginUser
)

orgRouter.get(
	"/:orgId/users",
	[
		requireURLParams("orgId")
	],
	getOrgUsers
)

orgRouter.post(
	"/:orgId/users",
	[
		requireURLParams("orgId"),
		requireBodyParams("userId", "userPassword", "userRole")
	],
	createOrgUser
)

orgRouter.get(
	"/:orgId/analytics",
	[
		requireURLParams("orgId")
	],
	getOrgAnalytics
)

orgRouter.use(
	"/:orgId/skus",
	[
		requireURLParams("orgId")
	],
	skuRouter
)

orgRouter.use(
	"/:orgId/warehouses",
	[
		requireURLParams("orgId")
	],
	warehouseRouter
)

export {
	orgRouter
}