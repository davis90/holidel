import {DataSource} from 'typeorm'
import dotenv from 'dotenv'
import path from 'path'
import {allEntities} from '../entities'

declare const __dirname: string

console.log(__dirname)

dotenv.config()

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
    throw new Error('DATABASE_URL not set in environment')
}

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: connectionString,
    // Use migrations for schema changes. Set synchronize=false for migrations flow.
    synchronize: false,
    logging: false,
    entities: allEntities,
    migrations: [path.join(__dirname, '..', 'migrations', '*.ts')]
})

export default AppDataSource
