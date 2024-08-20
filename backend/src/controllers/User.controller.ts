import { Request, Response } from 'express'
import { EditProfileService, GetUsersService, GetUserWithCredentialsService, JoinMemberService, LoginMemberService } from '../services/User.service'
import { GenerateRefreshToken, GenerateWebToken } from '../../utils/jwt'
import dotenv from 'dotenv'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
export async function JoinMemberController(req: Request, res: Response) {
    try {
        await JoinMemberService(req.body)
        res.status(200).send({ message: "We Received Your Request, We'll get Back to You" })
    } catch (error) {
        res.status(500).send('Server Error')
        console.log(error)
    }
}

export async function LoginController(req: Request, res: Response) {
    const { email, password } = req.body
    try {
        const user = await LoginMemberService(email, password)

        res.cookie('accessToken', GenerateWebToken(user.MemberId, process.env.ACCESS_PRIVATE_KEY!), { httpOnly: true })
        res.cookie('refreshToken', GenerateRefreshToken(user.MemberId, process.env.REFRESH_PRIVATE_KEY!), { httpOnly: true })

        res.status(200).send(user)
    } catch (error) {

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2025") res.status(404).send('Credentials Not Found')
            else res.status(500).send('Internal Server Error, Try Again')
        }
        else res.status(500).send('Unexpected Error, Try Again')
    }

}

export async function GetUserController(req: Request, res: Response) {
    const { UserType } = req.params
    try {
        const members = await GetUsersService(UserType)
        res.status(200).send(members)
    } catch (error) {
        console.log('error occurred')
    }
}

export async function GetUserWithCredentialsController(req: Request, res: Response) {
    const { Email, MemberId } = req.body
    try {
        const user = await GetUserWithCredentialsService(Email, MemberId)
        res.status(200).send(user)
    } catch (error) {

    }
}

export async function EditProfileController(req: Request, res: Response) {

    const values = req.body

    try {

        const newData = await EditProfileService(values)

        res.status(200).send(newData)

    } catch (error) {

        res.status(500).send('Internal Server Error')

    }
}