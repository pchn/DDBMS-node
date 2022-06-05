import { createExpressServer } from 'routing-controllers'

require('reflect-metadata')

const bp = require('body-parser')
const dotenv = require('dotenv')
const log4js = require('log4js')

export const logger = log4js.getLogger()

dotenv.config()

/* Getting environment variables */
logger.level = process.env.LOG_LEVEL
const port = process.env.PORT
/* ----------------------------- */

/* Initializing classes */

/* -------------------- */

/* Create express app, register all controller routes and get express app instance */
const app = createExpressServer({
  controllers: [] // specify controllers we want to use
})

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

/* Run express application on port specified in .env */
app.listen(port)
logger.debug('App has started...')
