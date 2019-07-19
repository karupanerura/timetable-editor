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
        <tracks-form :tracks.sync="tracks" />
        <timespan-form @create="addTimespan" />
        <item-form @create="addItem" />

        <timetable :timetable="timetable" />

        <form @submit.prevent="exportTimetable">
          <button type="submit">
            Export
          </button>

          <a v-if="exportURL" :href="exportURL" download>
            Download
          </a>
        </form>

        <form @submit.prevent="importTimetable">
          <input type="file" name="import-target" @change="loadImportTarget">

          <button type="submit" :disabled="!loadedContent">
            Import
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<style>
</style>

<script>
import Timetable from '~/components/timetable.vue'
import TracksForm from '~/components/tracks-form.vue'
import ItemForm from '~/components/item-form.vue'
import TimespanForm from '~/components/timespan-form.vue'
import { TimetableModel } from '~/src/timetable'

export default {
  components: {
    Timetable, TracksForm, ItemForm, TimespanForm
  },
  data() {
    return {
      tracks: '2',
      timespans: [],
      items: [],
      loadedContent: null,
      exportURL: null
    }
  },
  computed: {
    tracksNum() {
      return parseInt(this.tracks)
    },
    timetable() {
      return TimetableModel.create(this.tracksNum, this.timespans, this.items)
    }
  },
  methods: {
    addItem(item) {
      this.items.push(item)
    },
    addTimespan(timespan) {
      const duplicated =
        this.timespans.filter(item => item.equals(timespan)).length > 0
      if (duplicated) {
        // skip it
        return
      }

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
    },
    exportTimetable() {
      const content = JSON.stringify(this.timetable.toDTO())
      const blob = new Blob([content], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      this.exportURL = url
    },
    loadImportTarget(e) {
      const target = e.target
      const file = target.files[0]
      const type = file.type
      if (type !== 'application/json') {
        alert('File is not JSON')
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        this.loadedContent = e.target.result
      }
      reader.readAsText(file)
    },
    importTimetable() {
      const dto = JSON.parse(this.loadedContent)
      const timetable = TimetableModel.fromDTO(dto)
      this.tracks = timetable.tracks.toString()
      this.timespans = timetable.timespans
      this.items = timetable.items
    }
  }
}
</script>
