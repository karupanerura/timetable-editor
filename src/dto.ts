export interface TimetableDTO {
  readonly tracks: number
  readonly timespans: TimespanDTO[]
  readonly items: TimetableItemDTO[]
}

export interface TimespanDTO {
  readonly beginsTime: TimeDTO
  readonly endsTime: TimeDTO
}

export interface TimeDTO {
  readonly hour: number
  readonly minute: number
}

export interface TimetableItemDTO {
  readonly title: string
  readonly description: string
  readonly extras: Map<string, any>
  readonly timespan: TimespanDTO
  readonly trackIds: number[]
}
