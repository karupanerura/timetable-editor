<template>
  <div class="timetable">
    <div class="timetable-timespans">
      <timespans :items="timespans" />
    </div>
    <div class="timetable-contents">
      <tracks :count="tracks" />
      <items :items="items" :columns="columns" :rows="rows" :row-height="64" />
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
import Tracks from '~/components/timetable/tracks'
import Timespans from '~/components/timetable/timespans'
import Items from '~/components/timetable/items'

export default {
  components: {
    Tracks,
    Timespans,
    Items
  },
  props: {
    tracks: { type: Number, default: 2 },
    timespans: { type: Array, default: () => [] },
    items: { type: Array, default: () => [] }
  },
  data() {
    return {}
  },
  computed: {
    rows() {
      return this.timespans.length
    },
    columns() {
      return this.tracks
    }
  }
}
</script>
