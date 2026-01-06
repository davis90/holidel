import {Entity, JoinColumn, Column, OneToOne} from 'typeorm'
import {PostalAddress} from './PostalAddress'
import {BaseEntity} from './BaseEntity'

@Entity('offices')
export class Office extends BaseEntity {

    @Column('uuid', {name: 'postal_address_id'})
    postalAddressId!: string

    @OneToOne(() => PostalAddress)
    @JoinColumn({name: 'postal_address_id'})
    postalAddress!: PostalAddress
}
