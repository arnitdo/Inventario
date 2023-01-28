import {Router, Request, Response} from "express";
import {orgRouter} from "./orgRoutes";

const apiRouter = Router()

apiRouter.use(
	"/orgs",
	orgRouter
)

export {
	apiRouter
}