import 'reflect-metadata'
import {AppDataSource} from '../db/data-source'
import {User} from '../entities/User'
import {Nurse, NurseStatus} from '../entities/Nurse'
import {Offer} from '../entities/Offer'
import bcrypt from 'bcryptjs'

/**
 * Script to seed a nurse with user and offers
 * Creates:
 * - 1 User account
 * - 1 Nurse associated with the user
 * - 5 Offers associated with the nurse
 */
async function seedNurseWithOffers(): Promise<void> {
    try {
        // Initialize database connection
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize()
        }

        console.log('🌱 Starting seed: Creating nurse with user and offers...\n')

        const nurseRepo = AppDataSource.getRepository(Nurse)
        const userRepo = AppDataSource.getRepository(User)
        const offerRepo = AppDataSource.getRepository(Offer)

        // Step 1: Create Nurse
        console.log('📋 Creating nurse...')
        const nurse = nurseRepo.create({
            status: NurseStatus.ASSOCIATE,
            email: 'nurse.test@example.com',
            firstName: 'Marie',
            lastName: 'Dupont',
            authorizedDepartment: [75, 92, 93], // Île-de-France departments
            description: 'Infirmière expérimentée en soins à domicile avec spécialisation en plaies et pansements',
            startActivityDate: new Date('2020-01-15'),
            phoneNumber: '+33612345678'
        })

        const savedNurse = await nurseRepo.save(nurse)
        console.log(`✅ Nurse created: ${savedNurse.id}\n`)

        // Step 2: Create User associated with Nurse
        console.log('👤 Creating user account...')
        const hashedPassword = await bcrypt.hash('TestPassword123!', 10)
        const user = userRepo.create({
            nurseId: savedNurse.id,
            nurse: savedNurse,
            password: hashedPassword,
            active: true
        })

        const savedUser = await userRepo.save(user)
        console.log(`✅ User created: ${savedUser.nurseId}\n`)

        // Step 3: Create multiple Offers
        console.log('💼 Creating offers...')
        const offers: Offer[] = []

        // Offer 1: Short-term, high compensation
        offers.push(
            offerRepo.create({
                nurse: savedNurse,
                period: [
                    new Date('2024-12-15'),
                    new Date('2024-12-31')
                ],
                nbDaysMin: 10,
                nbDaysMax: 15,
                retrocessionRate: 45,
                averageTechnicalCareDay: 5,
                averageKilometersDay: 120,
                averageConsultationsDay: 8
            })
        )

        // Offer 2: Medium-term, moderate compensation
        offers.push(
            offerRepo.create({
                nurse: savedNurse,
                period: [
                    new Date('2025-01-01'),
                    new Date('2025-03-31')
                ],
                nbDaysMin: 20,
                nbDaysMax: 25,
                retrocessionRate: 35,
                averageTechnicalCareDay: 3,
                averageKilometersDay: 80,
                averageConsultationsDay: 6
            })
        )

        // Offer 3: Long-term, stable position
        offers.push(
            offerRepo.create({
                nurse: savedNurse,
                period: [
                    new Date('2025-04-01'),
                    new Date('2025-12-31')
                ],
                nbDaysMin: 25,
                nbDaysMax: 30,
                retrocessionRate: 30,
                averageTechnicalCareDay: 4,
                averageKilometersDay: 100,
                averageConsultationsDay: 7
            })
        )

        // Offer 4: Weekend work with premium
        offers.push(
            offerRepo.create({
                nurse: savedNurse,
                period: [
                    new Date('2025-01-15'),
                    new Date('2025-06-30')
                ],
                nbDaysMin: 5,
                nbDaysMax: 8,
                retrocessionRate: 55,
                averageTechnicalCareDay: 2,
                averageKilometersDay: 60,
                averageConsultationsDay: 4
            })
        )

        // Offer 5: Specialized care position
        offers.push(
            offerRepo.create({
                nurse: savedNurse,
                period: [
                    new Date('2025-02-01'),
                    new Date('2025-05-31')
                ],
                nbDaysMin: 15,
                nbDaysMax: 20,
                retrocessionRate: 40,
                averageTechnicalCareDay: 7,
                averageKilometersDay: 140,
                averageConsultationsDay: 9
            })
        )

        // Offer 6: Intensive rural position - high kilometers
        offers.push(
            offerRepo.create({
                nurse: savedNurse,
                period: [
                    new Date('2025-03-01'),
                    new Date('2025-08-31')
                ],
                nbDaysMin: 18,
                nbDaysMax: 22,
                retrocessionRate: 38,
                averageTechnicalCareDay: 2,
                averageKilometersDay: 250,
                averageConsultationsDay: 5
            })
        )

        // Offer 7: Low intensity urban - low kilometers
        offers.push(
            offerRepo.create({
                nurse: savedNurse,
                period: [
                    new Date('2025-05-15'),
                    new Date('2025-07-15')
                ],
                nbDaysMin: 8,
                nbDaysMax: 12,
                retrocessionRate: 25,
                averageTechnicalCareDay: 1,
                averageKilometersDay: 30,
                averageConsultationsDay: 3
            })
        )

        // Offer 8: Very high technical care requirement
        offers.push(
            offerRepo.create({
                nurse: savedNurse,
                period: [
                    new Date('2025-01-20'),
                    new Date('2025-04-20')
                ],
                nbDaysMin: 22,
                nbDaysMax: 28,
                retrocessionRate: 50,
                averageTechnicalCareDay: 9,
                averageKilometersDay: 110,
                averageConsultationsDay: 8
            })
        )

        // Offer 9: High consultation volume
        offers.push(
            offerRepo.create({
                nurse: savedNurse,
                period: [
                    new Date('2025-02-10'),
                    new Date('2025-06-10')
                ],
                nbDaysMin: 12,
                nbDaysMax: 18,
                retrocessionRate: 32,
                averageTechnicalCareDay: 3,
                averageKilometersDay: 95,
                averageConsultationsDay: 12
            })
        )

        // Offer 10: Minimum days work
        offers.push(
            offerRepo.create({
                nurse: savedNurse,
                period: [
                    new Date('2025-06-01'),
                    new Date('2025-09-30')
                ],
                nbDaysMin: 2,
                nbDaysMax: 5,
                retrocessionRate: 60,
                averageTechnicalCareDay: 1,
                averageKilometersDay: 40,
                averageConsultationsDay: 2
            })
        )

        // Offer 11: Maximum days work - full-time equivalent
        offers.push(
            offerRepo.create({
                nurse: savedNurse,
                period: [
                    new Date('2025-01-01'),
                    new Date('2025-12-31')
                ],
                nbDaysMin: 28,
                nbDaysMax: 32,
                retrocessionRate: 28,
                averageTechnicalCareDay: 5,
                averageKilometersDay: 130,
                averageConsultationsDay: 7
            })
        )

        // Offer 12: Mid-range balanced offer
        offers.push(
            offerRepo.create({
                nurse: savedNurse,
                period: [
                    new Date('2025-03-15'),
                    new Date('2025-09-15')
                ],
                nbDaysMin: 14,
                nbDaysMax: 18,
                retrocessionRate: 42,
                averageTechnicalCareDay: 4,
                averageKilometersDay: 105,
                averageConsultationsDay: 6
            })
        )

        const savedOffers = await offerRepo.save(offers)
        console.log(`✅ ${savedOffers.length} offers created\n`)

        // Print summary
        console.log('='.repeat(60))
        console.log('📊 SEED SUMMARY')
        console.log('='.repeat(60))
        console.log(`\n👤 User:`)
        console.log(`   - Nurse ID: ${savedUser.nurseId}`)
        console.log(`   - Email: nurse.test@example.com`)
        console.log(`   - Password: TestPassword123!`)
        console.log(`   - Active: ${savedUser.active}`)

        console.log(`\n📋 Nurse:`)
        console.log(`   - ID: ${savedNurse.id}`)
        console.log(`   - Name: ${savedNurse.firstName} ${savedNurse.lastName}`)
        console.log(`   - Status: ${savedNurse.status}`)
        console.log(`   - Email: ${savedNurse.email}`)
        console.log(`   - Phone: ${savedNurse.phoneNumber}`)
        console.log(`   - Authorized Departments: ${savedNurse.authorizedDepartment.join(', ')}`)
        console.log(`   - Start Date: ${savedNurse.startActivityDate.toLocaleDateString('fr-FR')}`)

        console.log(`\n💼 Offers (${savedOffers.length}):`)
        savedOffers.forEach((offer, index) => {
            const startDate = new Date(offer.period[0]).toLocaleDateString('fr-FR')
            const endDate = new Date(offer.period[1]).toLocaleDateString('fr-FR')
            console.log(`   ${index + 1}. ${startDate} → ${endDate}`)
            console.log(`      - Days: ${offer.nbDaysMin}-${offer.nbDaysMax}`)
            console.log(`      - Rate: ${offer.retrocessionRate}%`)
            console.log(`      - Tech Care: ${offer.averageTechnicalCareDay}/day`)
            console.log(`      - Kilometers: ${offer.averageKilometersDay}/day`)
            console.log(`      - Consultations: ${offer.averageConsultationsDay}/day`)
        })

        console.log('\n' + '='.repeat(60))
        console.log('✅ Seed completed successfully!')
        console.log('='.repeat(60) + '\n')

    } catch (error) {
        console.error('❌ Seed failed:', error)
        process.exit(1)
    } finally {
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy()
        }
    }
}

// Run seed
seedNurseWithOffers()
