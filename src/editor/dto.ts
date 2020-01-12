import { TimespanDTO } from '../timespan/dto'

export interface TimetableDTO {
  readonly tracks: number
  readonly timespans: TimespanDTO[]
  readonly items: TimetableItemDTO[]
}

export interface TimetableItemDTO {
  readonly title: string
  readonly description: string
  readonly extras: Map<string, any>
  readonly timespan: TimespanDTO
  readonly trackIds: number[]
}
