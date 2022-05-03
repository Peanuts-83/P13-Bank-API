const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
const swaggerDocs = yaml.load('./swagger.yaml')
const dbConnection = require('./database/connection')
const compression = require('compression')
const helmet = require('helmet')


const app = express()
const PORT = process.env.NODE_ENV === 'production' ?
  process.env.PORT : 3001

app.use(helmet())
app.use(compression())

// Connect to the database
dbConnection()

// Handle CORS issues
app.use(cors())

// Request payload middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handle custom routes
app.use('/api/v1/user', require('./routes/userRoutes'))

// API Documentation
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

app.get('/', (req, res, next) => {
  res.send('Hello from my Express server v2!')
})


app.listen(PORT, () => {
  console.log("Server listening on ", process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:' : `${req.protocol}://${req.get("host")}${req.originalUrl}:`, PORT)
})
