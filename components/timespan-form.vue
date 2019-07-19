<template>
  <form action="javascript:void(0)" @submit.prevent="addTimespan()">
    time span: <input
      v-model="draftBeginsTime"
      type="time"
      name="begins-time"
      :step="timeStepSeconds"
      :max="draftEndsTime"
      required
      pattern="[0-9]{2}:[0-9]{2}"
    > ~ <input
      v-model="draftEndsTime"
      type="time"
      name="ends-time"
      :step="timeStepSeconds"
      :min="draftBeginsTime"
      required
      pattern="[0-9]{2}:[0-9]{2}"
    ><button type="submit">
      add
    </button><br>
  </form>
</template>

<script lang="ts">
import { Vue, Component, Prop, Provide, Emit } from 'vue-property-decorator'

import { Time, Timespan } from '~/src/time'

@Component({
  computed: {
    timeStepSeconds() {
      return this.timeStep * 60
    }
  }
})
export default class ItemForm extends Vue {
  @Prop({ type: Number, default: 10 }) readonly timeStep: number

  @Provide() draftBeginsTime = '09:00'

  @Provide() draftEndsTime = '09:10'

  @Emit('create')
  addTimespan(): Timespan {
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

    return timespan
  }
}
</script>
