import express from 'express'
import EventsRoutes from './EventsRouter'
import { MembershipRouter } from './UserRouter'

const Router = express()

Router.use('/events', EventsRoutes)
Router.use('/membership', MembershipRouter)

export default Router