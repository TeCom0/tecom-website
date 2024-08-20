import { SeedEvents } from "./Event";
import { SeedMembers } from "./Users";

const Seeder = async () => {
    try {
        await SeedEvents()
        await SeedMembers()
        console.log('All Data is Seeded')
    } catch (error) {
        console.log('Cannot Seed')
    }
}

Seeder()