import {Entity, JoinColumn, Column, OneToOne, ManyToOne} from 'typeorm'
import {PostalAddress} from './PostalAddress'
import {BaseEntity} from './BaseEntity'
import {Nurse} from './Nurse'

@Entity('diplomas')
export class Diploma extends BaseEntity {

    @ManyToOne(() => Nurse, (nurse: Nurse) => nurse.offers)
    nurse!: Nurse

    @Column()
    label!: string

    @Column('uuid', {name: 'postal_address_id'})
    postalAddressId!: string

    @OneToOne(() => PostalAddress)
    @JoinColumn({name: 'postal_address_id'})
    postalAddress!: PostalAddress;

    @Column({name: 'date_graduation', type: 'timestamptz'})
    dateGraduation!: Date
}
