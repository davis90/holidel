import 'reflect-metadata'
import {AppDataSource} from '../db/data-source'
import {Nurse} from '../entities/Nurse'
import {User} from '../entities/User'
import {Offer} from '../entities/Offer'

async function cleanTestData() {
    try {
        await AppDataSource.initialize()
        console.log('✅ DataSource initialized')

        const nurseRepo = AppDataSource.getRepository(Nurse)
        const userRepo = AppDataSource.getRepository(User)
        const offerRepo = AppDataSource.getRepository(Offer)

        // Find test nurse by email
        const testNurse = await nurseRepo.findOne({
            where: {email: 'test.nurse@example.com'}
        })

        if (!testNurse) {
            console.log('⚠️  Test data not found. Nothing to clean.')
            await AppDataSource.destroy()
            return
        }

        console.log('🧹 Cleaning test data...')

        // Delete related offers
        const offersDeleted = await offerRepo.delete({nurse: {id: testNurse.id}})
        console.log(`   ✓ ${offersDeleted.affected || 0} Offers deleted`)

        // Delete related user
        const usersDeleted = await userRepo.delete({nurseId: testNurse.id})
        console.log(`   ✓ ${usersDeleted.affected || 0} User(s) deleted`)

        // Delete nurse
        const nursesDeleted = await nurseRepo.delete({id: testNurse.id})
        console.log(`   ✓ ${nursesDeleted.affected || 0} Nurse deleted`)

        console.log('\n' + '='.repeat(60))
        console.log('✨ Test data cleanup completed successfully!')
        console.log('='.repeat(60))
        console.log('\n📊 Summary:')
        console.log(`   - Offers removed: ${offersDeleted.affected || 0}`)
        console.log(`   - Users removed: ${usersDeleted.affected || 0}`)
        console.log(`   - Nurses removed: ${nursesDeleted.affected || 0}`)

        await AppDataSource.destroy()
    } catch (error) {
        console.error('❌ Cleanup failed:', error)
        process.exit(1)
    }
}

cleanTestData()
