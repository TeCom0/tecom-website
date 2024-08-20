import dotenv from 'dotenv'
import express from 'express'
import applyGlobalMiddlewares from '../utils/GlobalMiddlewares'

dotenv.config()

const app = express()

applyGlobalMiddlewares(app)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on Port ${process.env.PORT}`)
})