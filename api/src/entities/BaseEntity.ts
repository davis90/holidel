import {PrimaryGeneratedColumn} from 'typeorm'
import {TimeStamp} from './TimeStamp'

export class BaseEntity extends TimeStamp {
    @PrimaryGeneratedColumn('uuid')
    id!: string
}
