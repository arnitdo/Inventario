import {Request, Response, NextFunction} from "express";

function requireBodyParams(...requiredBodyParams: string[]){
	return function (req: Request, res: Response, next: NextFunction){
		const receivedParams = Object.keys(req.body)
		const missingParams: string[] = []
		for (const requiredBodyParam of requiredBodyParams) {
			if (receivedParams.indexOf(requiredBodyParam) == -1){
				missingParams.push(requiredBodyParam)
			}
		}

		if (missingParams.length > 0){
			res.status(400).json({
				"status": "ERR_MISSING_BODY_PARAMS",
				"missingParams": missingParams
			})
		} else {
			next()
		}
	}
}

function requireURLParams(...requiredURLParams: string[]){
	return function (req: Request, res: Response, next: NextFunction){
		const receivedParams = Object.keys(req.params)
		const missingParams: string[] = []
		for (const requiredBodyParam of requiredURLParams) {
			if (receivedParams.indexOf(requiredBodyParam) == -1){
				missingParams.push(requiredBodyParam)
			}
		}

		if (missingParams.length > 0){
			res.status(400).json({
				"status": "ERR_MISSING_URL_PARAMS",
				"missingParams": missingParams
			})
		} else {
			next()
		}
	}
}

export {
	requireBodyParams,
	requireURLParams
}