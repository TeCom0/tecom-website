import prisma from "../prisma/Generator";

async function getUser(){
    try {
        const user = await prisma.members.findMany()
        console.log(user)
    } catch (error) {
        console.log(error)
    }
}

getUser()