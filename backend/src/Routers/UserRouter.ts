import express from 'express'
import { EditProfileController, GetUserController, GetUserWithCredentialsController, JoinMemberController, LoginController } from '../controllers/User.controller'
import validateResource from '../middlewares/ValidateResource'
import { NewMemberSchema } from '../schemas/Member.schema'
import { CheckSession } from '../middlewares/SessionCheck'

export const MembershipRouter = express()

MembershipRouter.post('/joinMember', validateResource(NewMemberSchema), JoinMemberController)
MembershipRouter.post('/login', LoginController)
MembershipRouter.get('/:UserType', GetUserController)
MembershipRouter.post('/credentials', GetUserWithCredentialsController)
MembershipRouter.put('/EditProfile', CheckSession, EditProfileController)