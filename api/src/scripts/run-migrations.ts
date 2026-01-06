import 'reflect-metadata'
import {AppDataSource} from '../db/data-source'

async function run() {
    await AppDataSource.initialize()
    try {
        const migrations = await AppDataSource.runMigrations()
        console.log('Migrations run:', migrations.map(m => m.name))
    } catch (err) {
        console.error('Migration error:', err)
        process.exit(1)
    } finally {
        await AppDataSource.destroy()
    }
}

run()
