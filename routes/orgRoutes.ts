import {Router, Request, Response} from "express";
import {requireBodyParams, requireURLParams} from "../utils/middleware";
import {db} from "../utils/db";
import {skuRouter} from "./skuRoutes";

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

orgRouter.use(
	"/:orgId/skus",
	[
		requireURLParams("orgId")
	],
	skuRouter
)

export {
	orgRouter
}