import {Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn} from 'typeorm'

@Entity('token_blacklist')
@Index('idx_token_blacklist_expires_at', ['expiresAt'])
export class TokenBlacklist {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({unique: true, type: 'text'})
    token!: string

    @Column({type: 'timestamptz', name: 'expires_at'})
    expiresAt!: Date

    @CreateDateColumn({type: 'timestamptz', name: 'blacklisted_at'})
    blacklistedAt!: Date
}
