import {Router, Request, Response} from "express";
import * as path from "path";

const clientRouter = Router()

clientRouter.get("*", (req: Request, res: Response) => {
	res.status(200).sendFile(
		path.join(
			__dirname,
			'../client/build/index.html'
		)
	)
})

export {
	clientRouter
}