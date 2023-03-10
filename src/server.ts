import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import 'express-async-errors'
import { router } from './routes'
import path from 'path'

const app = express()

app.use(cors())
app.use(express.json())

app.use(router)

app.use(
  '/files',
  express.static(path.resolve(__filename, './tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof Error){
    return res.status(400).json({
      error: err.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3333
})

//"build": "tsup src",
//"start": "node dis/server.js"