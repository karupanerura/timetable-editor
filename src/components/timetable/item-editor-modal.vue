<template>
  <keep-alive>
    <template v-if="!!grid">
      <div class="modal is-active">
        <div class="modal-background" @click="close"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <template v-if="editor">
              <div class="field">
                <label class="label">Title</label>
                <div class="control">
                  <input class="input" type="text" v-model="draftTitle" placeholder="Title" required>
                </div>
              </div>
            </template>
            <template v-else>
              <p class="modal-card-title">{{ grid.item.title }}</p>
              <button @click="close" class="delete" aria-label="close"></button>
            </template>
          </header>
          <section class="modal-card-body">
            <template v-if="editor">
              <div class="field">
                <label class="label">Description</label>
                <div class="control">
                  <textarea
                    v-model="draftDescription"
                    class="textarea"
                    placeholder="Description"
                    required
                  />
                </div>
              </div>
              <h4 class="mt-1">Extras</h4>
              <div class="field has-addons" v-for="entry in this.draftExtras" :key="entry[0]">
                <p class="control">
                  <input class="input" type="text" v-model.lazy="entry[0]" placeholder="Key" required>
                </p>
                <p class="control">
                  <input class="input" type="text" v-model.lazy="entry[1]" :placeholder="'Value (' + typeof(entry[1]) + ')'" required>
                </p>
                <p class="control">
                  <button @click="removeExtras(entry[0])" :disabled="!canAddExtras && 'disabled'" class="button is-danger">Remove</button>
                </p>
              </div>
              <div class="field is-grouped">
                <div class="control">
                  <button @click="addExtras()"  class="button is-link">Add</button>
                </div>
              </div>
            </template>
            <template v-else>
              <p style="white-space: pre-wrap">{{ grid.item.description }}</p>
              <template v-if="hasExtras">
                <h4 class="mt-1">Extras</h4>
                <table v-show="hasExtras" class="table">
                  <thead>
                    <tr>
                      <th>Key</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(value, key) in grid.item.extras" :key="key">
                      <th>{{ key }}</th>
                      <td>{{ value }}</td>
                    </tr>
                  </tbody>
                </table>
              </template>
            </template>
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
              <button @click="edit" class="button is-success">Edit</button>
              <button @click="close" class="button">Close</button>
            </template>
          </footer>
        </div>
      </div>
    </template>
  </keep-alive>
</template>

<script>
import { TimetableItem } from '../../editor/timetable-item'

export default {
  props: {
    grid: { type: Object, default: () => null },
    grids: { type: Array, default: () => [] },
  },
  data() {
    return {
      editor: false,
      draftTitle: '',
      draftDescription: '',
      draftExtras: [],
    }
  },
  computed: {
    hasExtras() {
      return Object.keys(this.grid.item.extras).length > 0
    },
  },
  methods: {
    edit() {
      this.draftTitle = this.grid.item.title
      this.draftDescription = this.grid.item.description
      this.draftExtras = Object.entries(this.grid.item.extras)
      this.editor = true
    },
    commit() {
      this.editor = false
      this.grid.item = new TimetableItem(
        this.draftTitle,
        this.draftDescription,
        Object.fromEntries(this.draftExtras)
      )
      this.$emit('update:grid', this.grid)
      this.$emit('update:grids', this.grids)
    },
    remove() {
      const ok = window.confirm(`Do you want to remove ${this.grid.item.title}`)
      if (!ok) {
        return
      }

      const grids = this.grids.filter((grid) => grid.id !== this.grid.id)
      this.$emit('update:grid', null)
      this.$emit('update:grids', grids)
      this.close()
    },
    cancel() {
      this.editor = false
    },
    close() {
      this.$emit('closemodal')
    },
    typeof(value) {
      return typeof value
    },
    removeExtras(key) {
      this.draftExtras = this.draftExtras.filter(([k]) => k !== key)
    },
    addExtras() {
      if (this.canAddExtras()) this.draftExtras.push(['', ''])
    },
    canAddExtras() {
      return this.draftExtras.filter(([k]) => k === '').length === 0
    },
  },
}
</script>
