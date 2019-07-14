'use strict'

export class Timespan {
  constructor(beginsTime, endsTime) {
    this.beginsTime = beginsTime
    this.endsTime = endsTime
  }

  isMoment() {
    return this.beginsTime.equals(this.endsTime)
  }

  isValid() {
    return this.beginsTime.compare(this.endsTime) <= 0
  }

  compare(timespan) {
    return (
      this.beginsTime.compare(timespan.beginsTime) ||
      this.endsTime.compare(timespan.endsTime)
    )
  }

  includes(timespan) {
    return (
      this.beginsTime.compare(timespan.beginsTime) <= 0 &&
      this.endsTime.compare(timespan.endsTime) >= 0
    )
  }

  conflicts(timespan) {
    return (
      this.beginsTime.compare(timespan.endsTime) < 0 &&
      this.endsTime.compare(timespan.beginsTime) > 0
    )
  }

  equals(timespan) {
    return (
      this.beginsTime.equals(timespan.beginsTime) &&
      this.endsTime.equals(timespan.endsTime)
    )
  }

  toString() {
    if (this.isMoment()) {
      return this.beginsTime.toString()
    }
    return this.beginsTime.toString() + ' ~ ' + this.endsTime.toString()
  }
}

export class Time {
  constructor(hour, minute) {
    this.hour = hour
    this.minute = minute
  }

  static parse(timeStr) {
    let [hour, minute] = timeStr.split(':')
    hour = hour ? parseInt(hour) : 0
    minute = minute ? parseInt(minute) : 0
    return new Time(hour, minute)
  }

  addMinutes(amount) {
    const minute = this.minute + amount
    const hour = Math.floor(this.hour + minute / 60)
    return new Time(hour % 24, minute % 60)
  }

  compare(time) {
    const hourDirection = this.compareHour(time)
    if (hourDirection !== 0) return hourDirection
    return this.compareMinute(time)
  }

  equals(time) {
    return this.hour === time.hour && this.minute === time.minute
  }

  compareHour(time) {
    if (this.hour < time.hour) {
      return -1
    } else if (this.hour === time.hour) {
      return 0
    }
    return 1
  }

  compareMinute(time) {
    if (this.minute < time.minute) {
      return -1
    } else if (this.minute === time.minute) {
      return 0
    }
    return 1
  }

  toString() {
    const hour =
      this.hour >= 10 ? this.hour.toString() : '0' + this.hour.toString()
    const minute =
      this.minute >= 10 ? this.minute.toString() : '0' + this.minute.toString()
    return hour + ':' + minute
  }
}
