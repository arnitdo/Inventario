import * as express from 'express'
import * as cors from 'cors'
import helmet from "helmet";
import * as path from "path";

import {clientRouter} from "./routes/clientRoutes";
import {apiRouter} from "./routes/apiRoutes";

const appPort = process.env.PORT || 7777
const appMode = process.env.NODE_ENV || "development"

const app = express()

app.use(cors())
app.use(helmet())

app.use(express.urlencoded({
	extended: true
}))
app.use(express.json())

app.use(
	express.static(
		path.join(__dirname, 'client/build')
	)
)

app.use(
	"/api",
	apiRouter
)

app.use(clientRouter)
app.listen(process.env.PORT || 7777, () => {
	console.log(`Inventario backend is up and running in ${appMode} mode on port ${appPort}`)
})