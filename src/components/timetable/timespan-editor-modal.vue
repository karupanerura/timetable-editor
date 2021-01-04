<template>
  <keep-alive>
    <template v-if="!!timespan">
      <div class="modal is-active">
        <div class="modal-background" @click="close"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">{{ timespan }}</p>
            <button @click="close" class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <div class="field has-addons">
              <div class="control">
                <input
                  v-model="beginsTime"
                  class="input"
                  type="time"
                  name="begins-time"
                  :step="timeStepSeconds"
                  :max="endsTime"
                  required
                  pattern="[0-9]{2}:[0-9]{2}"
                  :disabled="!editor"
                />
              </div>
              <p class="control">
                <a class="button is-static">~</a>
              </p>
              <div class="control">
                <input
                  v-model="endsTime"
                  class="input"
                  type="time"
                  name="ends-time"
                  :step="timeStepSeconds"
                  :min="beginsTime"
                  required
                  pattern="[0-9]{2}:[0-9]{2}"
                  :disabled="!editor"
                />
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <template v-if="editor">
              <div class="field is-grouped" style="width:100%">
                <div class="control">
                  <button @click="commit" class="button is-success">Save</button>
                </div>
                <div class="control">
                  <button @click="cancel" class="button">Cancel</button>
                </div>
              </div>
              <div class="field is-grouped is-grouped-right">
                <div class="control">
                  <button @click="remove" class="button is-danger">Remove</button>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="field is-grouped">
                <div class="control">
                  <button @click="edit" class="button is-success">Edit</button>
                </div>
                <div class="control">
                  <button @click="close" class="button">Close</button>
                </div>
              </div>
            </template>
          </footer>
        </div>
      </div>
    </template>
  </keep-alive>
</template>

<script>
import { Time } from '../../timespan/time'
import { Timespan } from '../../timespan/timespan'

export default {
  props: {
    timeStep: { type: Number, default: 10 },
    timespans: { type: Array, default: () => [] },
    timespan: { type: Object, default: () => null },
  },
  data() {
    return {
      editor: false,
      draftBeginsTime: null,
      draftEndsTime: null,
    }
  },
  computed: {
    timeStepSeconds() {
      return this.timeStep * 60
    },
    beginsTime: {
      get() {
        if (this.draftBeginsTime) {
          return this.draftBeginsTime
        }
        if (this.timespan) {
          return this.timespan.beginsTime.toString()
        }
        return '09:00'
      },
      set(time) {
        this.draftBeginsTime = time
      },
    },
    endsTime: {
      get() {
        if (this.draftEndsTime) {
          return this.draftEndsTime
        }
        if (this.timespan) {
          return this.timespan.endsTime.toString()
        }
        return '09:00'
      },
      set(time) {
        this.draftEndsTime = time
      },
    },
  },
  methods: {
    edit() {
      this.draftBeginsTime = this.timespan.beginsTime.toString()
      this.draftEndsTime = this.timespan.endsTime.toString()
      this.editor = true
    },
    commit() {
      const timespan = new Timespan(
        Time.parse(this.draftBeginsTime),
        Time.parse(this.draftEndsTime)
      )
      if (!timespan.isValid()) {
        alert(`${timespan} is invalid timespan`)
        return
      }

      // check duplication
      const timespans = this.timespans.filter((item) => !item.equals(this.timespan))
      const duplicated =
        timespans.filter((item) => item.equals(timespan)).length > 0
      if (duplicated) {
        alert(`${timespan} is duplicated`)
        return
      }

      // check conflict
      const conflict = timespans
        .map((item) => timespan.conflicts(item))
        .reduce((a, b) => a || b, false)
      if (conflict) {
        alert(`Conflict time span: ${this.draftBeginsTime} ~ ${this.draftEndsTime}`)
        return
      }

      timespans.push(timespan)
      this.$emit('update:timespan', timespan)
      this.$emit('update:timespans', timespans.sort((a, b) => a.compare(b)))
      this.reset()
    },
    remove() {
      const ok = window.confirm(`Do you want to remove ${this.timespan}`)
      if (!ok) {
        return
      }

      const timespans = this.timespans.filter((item) => !item.equals(this.timespan))
      this.$emit('update:timespan', null)
      this.$emit('update:timespans', timespans)
      this.reset()
      this.close()
    },
    cancel() {
      this.reset()
    },
    reset() {
      this.draftBeginsTime = null
      this.draftEndsTime = null
      this.editor = false
    },
    close() {
      this.$emit('closemodal')
    },
  },
}
</script>
