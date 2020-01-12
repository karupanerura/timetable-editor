import { TimespanDTO } from './dto'
import { Time } from './time'

export class Timespan {
  readonly beginsTime: Time
  readonly endsTime: Time

  constructor(beginsTime: Time, endsTime: Time) {
    this.beginsTime = beginsTime
    this.endsTime = endsTime
  }

  static fromDTO(dto: TimespanDTO): Timespan {
    const beginsTime = Time.fromDTO(dto.beginsTime)
    const endsTime = Time.fromDTO(dto.endsTime)
    return new Timespan(beginsTime, endsTime)
  }

  isMoment(): boolean {
    return this.beginsTime.equals(this.endsTime)
  }

  isValid(): boolean {
    return this.beginsTime.compare(this.endsTime) <= 0
  }

  compare(timespan: Timespan): number {
    return (
      this.beginsTime.compare(timespan.beginsTime) ||
      this.endsTime.compare(timespan.endsTime)
    )
  }

  includes(timespan: Timespan): boolean {
    return (
      this.beginsTime.compare(timespan.beginsTime) <= 0 &&
      this.endsTime.compare(timespan.endsTime) >= 0
    )
  }

  conflicts(timespan: Timespan): boolean {
    return (
      this.beginsTime.compare(timespan.endsTime) < 0 &&
      this.endsTime.compare(timespan.beginsTime) > 0
    )
  }

  equals(timespan: Timespan): boolean {
    return (
      this.beginsTime.equals(timespan.beginsTime) &&
      this.endsTime.equals(timespan.endsTime)
    )
  }

  toString(): string {
    if (this.isMoment()) {
      return this.beginsTime.toString()
    }
    return this.beginsTime.toString() + ' ~ ' + this.endsTime.toString()
  }
}
