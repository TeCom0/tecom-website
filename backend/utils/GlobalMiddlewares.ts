import cors from 'cors'
import express, { Express } from 'express'
import helmet from 'helmet'
import Router from '../src/Routers/Main'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()
const applyGlobalMiddlewares = (app: Express) => {
    app.set('trust proxy', true)
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())
    app.use(cors({
        credentials: true,
        origin: process.env.CLIENT_URL_DEV!,
    }))
    app.use(helmet())
    app.use(Router)
}
export default applyGlobalMiddlewares