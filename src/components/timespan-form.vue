<template>
  <div class="container">
    <form action="javascript:void(0)" @submit.prevent="addTimespan()">
      <div class="field has-addons">
        <div class="control">
          <input
            v-model="draftBeginsTime"
            class="input"
            type="time"
            name="begins-time"
            :step="timeStepSeconds"
            :max="draftEndsTime"
            required
            pattern="[0-9]{2}:[0-9]{2}"
          />
        </div>
        <p class="control">
          <a class="button is-static">~</a>
        </p>
        <div class="control">
          <input
            v-model="draftEndsTime"
            class="input"
            type="time"
            name="ends-time"
            :step="timeStepSeconds"
            :min="draftBeginsTime"
            required
            pattern="[0-9]{2}:[0-9]{2}"
          />
        </div>
        <div class="control">
          <button type="submit" class="button is-primary">Add</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { Time } from '../timespan/time'
import { Timespan } from '../timespan/timespan'

export default {
  props: {
    timeStep: { type: Number, default: 10 },
  },
  data() {
    return {
      draftBeginsTime: '09:00',
      draftEndsTime: '09:10'
    }
  },
  computed: {
    timeStepSeconds() {
      return this.timeStep * 60
    }
  },
  methods: {
    addTimespan() {
      if (this.draftBeginsTime === '') {
        alert('begins time is not defined')
        return
      }
      if (this.draftEndsTime === '') {
        alert('ends time is not defined')
        return
      }

      const timespan = new Timespan(
        Time.parse(this.draftBeginsTime),
        Time.parse(this.draftEndsTime)
      )
      if (!timespan.isValid()) {
        alert(timespan + ' is invalid timespan')
        return
      }

      this.draftBeginsTime = this.draftEndsTime
      this.draftEndsTime = Time.parse(this.draftBeginsTime).addMinutes(this.timeStep).toString()

      this.$emit('create', timespan)
    }
  }
}
</script>
