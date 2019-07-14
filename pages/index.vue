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
            min="2"
            max="8"
          >
        </form>
        <timespan-form @create="addTimespan" />
        <item-form @create="addItem" />

        <timetable :tracks="tracksNum" :timespans="timespans" :items="items" />
      </div>
    </section>
  </div>
</template>

<style>
</style>

<script>
import Timetable from '~/components/timetable.vue'
import ItemForm from '~/components/item-form.vue'
import TimespanForm from '~/components/timespan-form.vue'

export default {
  components: {
    Timetable, ItemForm, TimespanForm
  },
  data() {
    return {
      tracks: '2',
      timespans: [],
      items: []
    }
  },
  computed: {
    tracksNum() {
      return parseInt(this.tracks)
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
    }
  }
}
</script>
