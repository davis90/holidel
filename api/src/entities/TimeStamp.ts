import {CreateDateColumn} from 'typeorm'

export class TimeStamp {
    @CreateDateColumn({type: 'timestamptz', name: 'created_at'})
    createdAt!: Date

    @CreateDateColumn({type: 'timestamptz', name: 'edited_at'})
    editeddAt!: Date
}
