export interface TimeDTO {
  readonly hour: number
  readonly minute: number
}

export interface TimespanDTO {
  readonly beginsTime: TimeDTO
  readonly endsTime: TimeDTO
}
