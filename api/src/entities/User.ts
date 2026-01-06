import {Entity, Column, OneToOne, JoinColumn, PrimaryColumn} from 'typeorm'
import {TimeStamp} from './TimeStamp'
import {Nurse} from './Nurse'

@Entity('users')
export class User extends TimeStamp {

    @PrimaryColumn('uuid', {name: 'nurse_id'})
    nurseId!: string;

    @OneToOne(() => Nurse)
    @JoinColumn({name: 'nurse_id'})
    nurse!: Nurse;

    @Column({default: false})
    active!: boolean;

    @Column({select: false})
    password!: string;
}
