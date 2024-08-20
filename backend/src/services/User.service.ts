import prisma from "../../prisma/Generator";
import nodemailer from 'nodemailer'
import { faker } from "@faker-js/faker";
import dotenv from 'dotenv'
import { EditUser } from "../../utils/Types";
dotenv.config()
const transporter = nodemailer.createTransport({
    service: 'Outlook',
    port: 587,
    auth: {
        user: faker.internet.email({ firstName: 'TeCom' }), // this should change to actual credentials, we have to create account for mail sending for tecom, check with ITS
        pass: faker.internet.password({ length: 5 })
    }
})
export async function JoinMemberService(values: { FirstName: string; LastName: string; MemberId: string; Email: string }) {

    const { FirstName, LastName, MemberId, Email } = values


    try {
        await transporter.sendMail({
            from: `${MemberId}@aui.ma`,
            to: process.env.CLUB_EMAIL,
            subject: 'Request to Join Your Club',
            html: `<html>
                <body>
                    <p>Dear TeCom Club,</p>
                    <p>I have visited your website and was amazed by your work and activities. I would love to be part of your team. Please find my necessary information below:</p>
                    <p><strong>First Name:</strong> ${FirstName}</p>
                    <p><strong>Last Name:</strong> ${LastName}</p>
                    <p><strong>Id:</strong> ${MemberId}</p>
                    <p><strong>Email:</strong> ${Email}</p>
                    <p>Thanks in advance.</p>
                </body>
            </html>`
        })
    } catch (error) {
        throw error
    }
}

export async function LoginMemberService(Email: string, Password: string) {

    try {
        return await prisma.members.findFirstOrThrow({
            where: {
                AND: {
                    Email: Email,
                    Password: Password,
                    Position: {
                        in: ['General Secretary', 'Vice President', 'President', 'Treasurer']
                    }
                }
            },
            select: {
                MemberId: true,
                Email: true,
                Password: true,
                Position: true,
                FirstName: true,
                LastName: true
            }
        })
    } catch (error) {
        throw error
    }
}

export async function GetUsersService(type: string) {
    try {
        return await prisma.members.findMany({
            where: type === 'all' ? {} : { Position: type === 'Member' ? 'Member' : { not: 'Member' } }
        })
    } catch (error) {
        throw error
    }
}

export async function GetUserWithCredentialsService(email: string, id: string) {
    try {
        return await prisma.members.findFirstOrThrow({
            where:
            {
                AND:
                {
                    Email: email,
                    MemberId: id,
                    Position: {
                        in: ['General Secretary', 'Vice President', 'President', 'Treasurer']
                    }
                }
            }
        })
    } catch (error) {

    }
}

export async function EditProfileService(values: EditUser) {

    const { MemberId, Password, Position, FirstName, LastName, Email } = values

    try {

        return await prisma.members.update({
            where: {
                MemberId: MemberId
            },
            data: {
                Email: Email,
                Password: Password,
                Position: Position,
                FirstName: FirstName,
                LastName: LastName
            }
        })

    } catch (error) {

       throw error

    }

}