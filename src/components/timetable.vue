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

<script>
import Tracks from './timetable/tracks.vue'
import Timespans from './timetable/timespans.vue'
import Items from './timetable/items.vue'
import { TimetableModel } from '../editor/timetable'

export default {
  components: {
    Tracks,
    Timespans,
    Items
  },
  props: {
    timetable: { type: Object, default: () => {} },
  },
  computed: {
    timespans() {
      return this.timetable.timespans
    },
    grids() {
      return this.timetable.grids
    },
    rows() {
      return this.timetable.timespans.length
    },
    tracks() {
      return this.timetable.tracks
    },
    columns() {
      return this.timetable.tracks
    },
  },
}
</script>
