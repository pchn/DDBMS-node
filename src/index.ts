import { createExpressServer } from 'routing-controllers'
import { Database } from './database/Database'
import { Node } from './node/Node'
import { Rest } from './REST/Rest'

require('reflect-metadata')

const bp = require('body-parser')
const dotenv = require('dotenv')
const log4js = require('log4js')

export const logger = log4js.getLogger()

dotenv.config()

/* Getting environment variables */
logger.level = process.env.LOG_LEVEL
const port = process.env.PORT
export const dispatcher = process.env.DISPATCHER
export const ip = process.env.IP
/* ----------------------------- */

/* Initializing classes */
let database = new Database()
Node.init()
/* -------------------- */

/* Create express app, register all controller routes and get express app instance */
const app = createExpressServer({
  controllers: [Rest] // specify controllers we want to use
})

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

/* Run express application on port specified in .env */
app.listen(port)
logger.debug('App has started...')
