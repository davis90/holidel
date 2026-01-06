import {Entity, Column, ManyToOne, JoinColumn} from 'typeorm'
import {Nurse} from './Nurse'
import {BaseEntity} from './BaseEntity'

export enum OfferTypeDates {
    LIST = "list",
    INTERVAL = "interval"
}

@Entity('offers')
export class Offer extends BaseEntity {

    @ManyToOne(() => Nurse, (nurse: Nurse) => nurse.offers)
    @JoinColumn({name: 'nurse_id'})
    nurse!: Nurse

    @Column('uuid', {name: 'nurse_id'})
    nurseId!: string

    @Column({array: true, type: 'timestamptz'})
    period!: [Date, Date]

    @Column({type: 'numeric', precision: 4, scale: 0, name: 'nb_days_min'})
    nbDaysMin!: number

    @Column({type: 'numeric', precision: 4, scale: 0, name: 'nb_days_max'})
    nbDaysMax!: number

    @Column({type: 'numeric', precision: 2, scale: 0, name: 'retrocession_rate'})
    retrocessionRate!: number

    @Column({type: 'numeric', precision: 3, scale: 0, name: 'average_technical_care_day'})
    averageTechnicalCareDay!: number

    @Column({type: 'numeric', precision: 4, scale: 0, name: 'average_kilometers_day'})
    averageKilometersDay!: number

    @Column({type: 'numeric', precision: 3, scale: 0, name: 'average_consultations_day'})
    averageConsultationsDay!: number


}
