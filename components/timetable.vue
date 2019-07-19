<template>
  <div class="timetable">
    <div class="timetable-timespans">
      <timespans :items="timespans" />
    </div>
    <div class="timetable-contents">
      <tracks :count="tracks" />
      <items :grids="grids" :columns="columns" :rows="rows" :row-height="64" />
    </div>
  </div>
</template>

<style scoped>
.timetable {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
}

.timetable-timespans {
  margin-top: 64px;
  width: 240px;
}

.timetable-contents {
  width: 100%;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import Tracks from '~/components/timetable/tracks'
import Timespans from '~/components/timetable/timespans'
import Items from '~/components/timetable/items'
import { TimetableModel } from '~/src/timetable'

@Component({
  components: {
    Tracks,
    Timespans,
    Items
  }
})
export default class Timetable extends Vue {
  @Prop({ type: Object, default: () => {} }) timetable: TimetableModel

  get timespans() {
    return this.timetable.timespans
  }

  get grids() {
    return this.timetable.grids
  }

  get rows() {
    return this.timetable.timespans.length
  }

  get tracks() {
    return this.timetable.tracks
  }

  get columns() {
    return this.timetable.tracks
  }
}
</script>
