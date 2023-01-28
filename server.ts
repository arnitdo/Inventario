import * as express from 'express'
import * as pg from 'pg'
import * as dotenv from 'dotenv'

const appPort = process.env.PORT || 7777
const appMode = process.env.NODE_ENV || "development"

const app = express()

app.listen(process.env.PORT || 7777, () => {
	console.log(`Inventario backend is up and running in ${appMode} mode on port ${appPort}`)
})