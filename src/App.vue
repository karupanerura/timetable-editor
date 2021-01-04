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
        <div class="content">
          <timetable :timetable.sync="timetable" />
          <timespan-form @create="addTimespan" />
          <tracks-form :tracks.sync="tracks" />
        </div>

        <div class="content">
          <h4>Add Item</h4>
          <item-form @create="addItem" />
        </div>

        <div class="content">
          <h3>Export</h3>
          <form @submit.prevent="exportTimetable">
            <div class="field has-addons">
              <div class="control">
                <button class="button" type="submit">Generate Timetable JSON</button>
              </div>
              <div class="control">
                <a class="button is-link" :disabled="!exportURL" :href="exportURL" download>
                  Download
                </a>
              </div>
            </div>
          </form>

          <h3>Import</h3>
          <form @submit.prevent="importTimetable">
            <div class="field has-addons">
              <div class="control">
                <input type="file" class="input" name="import-target" @change="loadImportTarget">
              </div>
              <div class="control">
                <button type="submit" class="button" :disabled="!loadedContent">Import</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
</style>

<script>
import Timetable from './components/timetable.vue'
import TracksForm from './components/tracks-form.vue'
import ItemForm from './components/item-form.vue'
import TimespanForm from './components/timespan-form.vue'
import { TimetableModel } from './editor/timetable'

export default {
  components: {
    Timetable, TracksForm, ItemForm, TimespanForm
  },
  data() {
    return {
      tracks: 2,
      timespans: [],
      items: [],
      loadedContent: null,
      exportURL: null
    }
  },
  computed: {
    timetable: {
      get() {
        return TimetableModel.create(this.tracks, this.timespans, this.items)
      },
      set(timetable) {
        this.tracks = timetable.tracks
        this.timespans = timetable.timespans
        this.items = timetable.items
      }
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
      this.tracks = timetable.tracks
      this.timespans = timetable.timespans
      this.items = timetable.items
    }
  }
}
</script>
