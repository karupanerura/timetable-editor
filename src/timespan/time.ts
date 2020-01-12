import { TimeDTO } from './dto'

export class Time {
  readonly hour: number
  readonly minute: number

  constructor(hour: number, minute: number) {
    this.hour = hour
    this.minute = minute
  }

  static parse(timeStr: string): Time {
    const [hour, minute] = timeStr.split(':')
    const hourN = hour ? parseInt(hour) : 0
    const minuteN = minute ? parseInt(minute) : 0
    return new Time(hourN, minuteN)
  }

  static fromDTO(dto: TimeDTO): Time {
    return new Time(dto.hour, dto.minute)
  }

  addMinutes(amount: number): Time {
    const minute = this.minute + amount
    const hour = Math.floor(this.hour + minute / 60)
    return new Time(hour % 24, minute % 60)
  }

  compare(time: Time): number {
    const hourDirection = this.compareHour(time)
    if (hourDirection !== 0) return hourDirection
    return this.compareMinute(time)
  }

  equals(time: Time): boolean {
    return this.hour === time.hour && this.minute === time.minute
  }

  compareHour(time: Time): number {
    if (this.hour < time.hour) {
      return -1
    } else if (this.hour === time.hour) {
      return 0
    }
    return 1
  }

  compareMinute(time: Time): number {
    if (this.minute < time.minute) {
      return -1
    } else if (this.minute === time.minute) {
      return 0
    }
    return 1
  }

  toString(): string {
    const hour =
      this.hour >= 10 ? this.hour.toString() : '0' + this.hour.toString()
    const minute =
      this.minute >= 10 ? this.minute.toString() : '0' + this.minute.toString()
    return hour + ':' + minute
  }
}
