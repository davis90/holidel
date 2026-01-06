import {Entity, Column} from 'typeorm'
import {BaseEntity} from './BaseEntity'

@Entity('postal_addresses')
export class PostalAddress extends BaseEntity {

    @Column({name: 'additional_building'})
    additionalBuilding!: string

    @Column()
    address!: string

    @Column({name: 'additional_address'})
    additionalAddress!: string

    @Column({name: 'postal_code'})
    postalCode!: number

    @Column()
    city!: string
    @Column()
    cedex!: number
    @Column()
    country!: string
}
