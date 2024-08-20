import prisma from "../prisma/Generator";

async function Clean() {
    try {
        await prisma.members.deleteMany()
        await prisma.events.deleteMany()
        console.log('Data Cleaned')
    } catch (error) {
        console.log('Error occurred')
    }
}

Clean()