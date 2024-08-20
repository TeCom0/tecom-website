import { faker } from '@faker-js/faker'
import prisma from '../prisma/Generator'
const EventTypes = ["Workshop", "TechnoBreak", "Trip", "TechTalk", "Competition", "UpComingEvent"]
export const SeedEvents = async () => {
    try {
        await prisma.events.createMany({
            data: Array.from({ length: 30 }, () => ({
                EventId: faker.string.uuid(),
                EventType: faker.helpers.arrayElement(EventTypes),
                updatedAt: faker.date.recent(),
                date: faker.date.recent({ days: 4 }),
                description: faker.lorem.lines(2),
                Location: faker.location.city(),
                Title: faker.word.noun(),
            }))
        })
        console.log('Events are seeded')
    } catch (error) {
        console.log('Ran to an error while seeding Events')
    }
}