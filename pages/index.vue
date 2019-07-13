<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Timetable Editor
          </h1>
          <h2 class="subtitle">
            Web Timetable Editor
          </h2>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <form action="javascript:void(0)">
          tracks: <input
            v-model="tracks"
            type="number"
            name="tracks"
            value="2"
            min="2"
            max="8"
          ><br>
          time span: <input
            v-model="beginsTime"
            type="time"
            name="begins-time"
            :step="timeStep"
            :max="endsTime"
            required
            pattern="[0-9]{2}:[0-9]{2}"
          > ~ <input
            v-model="endsTime"
            type="time"
            name="ends-time"
            :step="timeStep"
            :min="beginsTime"
            required
            pattern="[0-9]{2}:[0-9]{2}"
          > <button type="submit" @click="addTimespan()">
            add
          </button><br>
        </form>

        <timetable :tracks="tracksNum" :timespans="timespans" />
      </div>
    </section>
  </div>
</template>

<style>
</style>

<script>
import Timetable from '~/components/timetable.vue'

class Timespan {
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

class Time {
  constructor(timeStr) {
    const [hour, minute] = timeStr.split(':')
    this.hour = hour ? parseInt(hour) : 0
    this.minute = minute ? parseInt(minute) : 0
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

export default {
  components: {
    Timetable
  },
  data() {
    return {
      tracks: '2',
      timeStep: 600,
      beginsTime: '09:00',
      endsTime: '09:10',
      timespans: []
    }
  },
  computed: {
    tracksNum() {
      return parseInt(this.tracks)
    }
  },
  methods: {
    addTimespan() {
      if (this.beginsTime === '') {
        alert('begins time is not defined')
        return
      }
      if (this.endsTime === '') {
        alert('ends time is not defined')
        return
      }

      const timespan = new Timespan(
        new Time(this.beginsTime),
        new Time(this.endsTime)
      )
      if (!timespan.isValid()) {
        alert(timespan + ' is invalid timespan')
        return
      }

      const duplicated =
        this.timespans.filter(item => item.equals(timespan)).length > 0
      if (duplicated) {
        // skip it
        return
      }

      /*
      const timespans = this.timespans.filter(
        item => !item.includes(timespan) && !timespan.includes(item)
      )
      */
      const timespans = this.timespans

      const conflict = timespans
        .map(item => timespan.conflicts(item))
        .reduce((a, b) => a || b, false)
      if (conflict) {
        alert('Conflict time span: ' + this.beginsTime + ' ~ ' + this.endsTime)
        return
      }

      timespans.push(timespan)
      this.timespans = timespans.sort((a, b) => a.compare(b))
    }
  }
}
</script>
