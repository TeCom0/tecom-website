import express from 'express'
import { DeleteEventController, GetEventsController, PostEventsController, UpdateEventController } from '../controllers/Events.controller'
import validateResource from '../middlewares/ValidateResource'
import { EventSchema } from '../schemas/Event.schema'
import { CheckSession } from '../middlewares/SessionCheck'
const EventsRoutes = express()

EventsRoutes.get('/:type', GetEventsController)
EventsRoutes.post('/Register', CheckSession, validateResource(EventSchema), PostEventsController)
EventsRoutes.delete('/delete/:eventId', CheckSession, DeleteEventController)
EventsRoutes.put('/Edit', CheckSession, UpdateEventController)

export default EventsRoutes