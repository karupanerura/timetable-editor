<template>
  <div class="content">
    <div class="timetable">
      <div class="timespans">
        <div v-for="timespan in timespans" :key="timespan.toString()" class="timespan" @click.right.prevent.stop="focusToTheTimespan(timespan)">
          <p class="title is-4">{{ timespan }}</p>
        </div>
      </div>

      <div class="timetable-contents">
        <div class="tracks">
          <tracks :count="tracks" />
        </div>
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
    </div>
    <item-editor-modal :grids.sync="grids" :grid.sync="focusedItemGrid" @closemodal="unfocusItem" />
    <timespan-editor-modal :timespan.sync="focusedTimespan" :timespans.sync="timespans" @closemodal="unfocusTimespan" />
  </div>
</template>

<style scoped>
.timespans {
  display: flex;
  flex-flow: column nowrap;
  margin-top: 64px;
  width: 240px;
}

.timespan {
  height: 64px;
  border : solid 1px rgba(0, 0, 0, 64);
}

.timespan p {
  padding: 16px 8px;
  text-align: right;
}

.timetable {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
}

.timetable-contents {
  width: 100%;
}
</style>

<script>
import { TimetableModel } from '../editor/timetable'
import Tracks from './timetable/tracks.vue'
import { GridLayout } from 'vue-grid-layout'
import GridItem from './timetable/grid-item.vue'
import ItemEditorModal from './timetable/item-editor-modal.vue'
import TimespanEditorModal from './timetable/timespan-editor-modal.vue'

export default {
  components: {
    Tracks,
    GridLayout,
    GridItem,
    ItemEditorModal,
    TimespanEditorModal,
  },
  props: {
    timetable: { type: Object, default: () => {} },
  },
  data() {
    return {
      focusedItemGrid: null,
      focusedTimespan: null,
    }
  },
  computed: {
    timespans: {
      get() {
        return this.timetable.timespans
      },
      set(timespans) {
        const timetable = TimetableModel.create(this.timetable.tracks, timespans, this.timetable.items)
        this.$emit('update:timetable', timetable)
      },
    },
    grids: {
      get() {
        return this.timetable.grids
      },
      set(grids) {
        const timetable = TimetableModel.create(this.timetable.tracks, this.timetable.timespans, grids.map(grid => grid.item))
        this.$emit('update:timetable', timetable)
      },
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
    focusToTheTimespan(timespan) {
      this.focusedTimespan = timespan
    },
    unfocusItem() {
       this.focusedItemGrid = null
    },
    unfocusTimespan() {
       this.focusedTimespan = null
    },
  },
}
</script>
