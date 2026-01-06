import 'reflect-metadata'
import {AppDataSource} from '../db/data-source'

async function revert() {
    await AppDataSource.initialize()
    try {
        await AppDataSource.undoLastMigration()
        console.log('Last migration reverted')
    } catch (err) {
        console.error('Revert migration error:', err)
        process.exit(1)
    } finally {
        await AppDataSource.destroy()
    }
}

revert()
