import prisma from "../prisma/Generator"
import { faker } from '@faker-js/faker'
export const SeedMembers = async () => {
    const Positions = ["President", "Vice President", "General Secretary", "Treasurer", "Member"]
    try {
        await prisma.members.createMany({
            data: Array.from({ length: 20 }, () => ({
                MemberId: faker.string.uuid(),
                FirstName: faker.person.firstName(),
                LastName: faker.person.lastName(),
                Email: `${faker.person.firstName()}@aui.ma`,
                Password: faker.internet.password(),
                Position: faker.helpers.arrayElement(Positions)
            }))
        })
        console.log('Members seeded')
    } catch (error) {
        console.log(error)
    }
}