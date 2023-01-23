import cors from 'cors'
import express from 'express'
const app = express()

import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

// db and authUser
import connectDB from './db/connect.js'

// router
import authRouter from './routes/authRoutes.js'
import exhibArtRoutes from './routes/exhibArtRoutes.js'
import collecArtRoutes from './routes/collecArtRoutes.js'

// middlewares
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticatedUser from './middleware/auth.js'

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.resolve(__dirname, './client/out')))

app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/arts', authenticatedUser, exhibArtRoutes)
app.use('/api/v1/collec-arts', authenticatedUser, collecArtRoutes)

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './client/out/index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 6000

const start = async () => {
  try {
    await connectDB(process.env.MONGODB)
    app.listen(
      port,
      () => console.log(),
      console.log(
        '\x1b[33m%s\x1b[0m',
        '\n***************************************'
      ),
      console.log(
        `    server is running on port : \x1b[36m${port}\x1b[0m \n🥭 successfully connected to \x1b[36mMongoDB\x1b[0m 🥭`
      ),
      console.log(
        '\x1b[33m%s\x1b[0m',
        '***************************************\n'
      )
    )
  } catch (error) {
    console.log(error)
  }
}

start()
