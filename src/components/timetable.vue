<template>
  <div class="timetable">
    <div class="timetable-timespans">
      <timespans :items="timespans" />
    </div>
    <div class="timetable-contents">
      <tracks :count="tracks" />
      <grid-layout
        :layout.sync="grids"
        :col-num="columns"
        :max-rows="rows"
        :margin="[0, 0]"
        :row-height="64"
        :is-draggable="true"
        :is-resizable="true"
        :use-css-transforms="true"
      >
        <grid-item v-for="grid in grids" :key="grid.i" :grid="grid" @focusgrid="focusToTheItemGrid" />
      </grid-layout>
    </div>
    <item-editor-modal :grid.sync="focusedItemGrid" @closemodal="unfocus" />
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
import { GridLayout } from 'vue-grid-layout'
import GridItem from './timetable/grid-item.vue'
import ItemEditorModal from './timetable/item-editor-modal.vue'

export default {
  components: {
    Tracks,
    Timespans,
    GridLayout,
    GridItem,
    ItemEditorModal,
  },
  props: {
    timetable: { type: Object, default: () => {} },
  },
  data() {
    return {
      focusedItemGrid: null,
    }
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
  methods: {
    focusToTheItemGrid(grid) {
      this.focusedItemGrid = grid
    },
    unfocus() {
       this.focusedItemGrid = null
    },
  },
}
</script>
