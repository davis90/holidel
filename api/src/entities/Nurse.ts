import {Entity, Column, OneToMany} from 'typeorm'
import {BaseEntity} from './BaseEntity'
import {Offer} from './Offer'
import {Certificate} from './Certificate'
import {Diploma} from './Diploma'

export enum NurseStatus {
    TITULAR = "titular",
    ASSOCIATE = "associate",
    COLLABORATOR = "collaborator"
}

@Entity('nurses')
export class Nurse extends BaseEntity {

    @Column({
        type: "enum",
        enum: NurseStatus,
        name: "status"
    })
    status!: NurseStatus

    @Column({unique: true, length: 100})
    email!: string

    @Column({length: 60, name: 'first_name'})
    firstName!: string

    @Column({length: 60, name: 'last_name'})
    lastName!: string

    @Column({array: true, type: 'numeric', precision: 2, name: 'authorized_department'})
    authorizedDepartment!: number[]

    @Column({type: 'text'})
    description?: string

    @Column({type: 'timestamptz', name: 'start_activity_date'})
    startActivityDate!: Date

    @Column({type: 'varchar', length: 20, name: 'phone_number', nullable: false})
    phoneNumber!: string  // E.164 format: +[country code][number] e.g., +33612345678

    @OneToMany(() => Offer, (offer: Offer) => offer.nurse)
    offers!: Offer[]

    @OneToMany(() => Certificate, (certificate: Certificate) => certificate.nurse)
    certificates!: Certificate[]

    @OneToMany(() => Diploma, (diploma: Diploma) => diploma.nurse)
    diplomas!: Diploma[]
}
