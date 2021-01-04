<template>
  <div class="container content">
    <form action="javascript:void(0)" @submit.prevent="addItem()">
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input
            v-model="draftTitle"
            class="input"
            type="text"
            name="title"
            required
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <input
            v-model="draftDescription"
            class="input"
            type="text"
            name="description"
            required
          />
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button type="submit" class="button is-primary">Add</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { TimetableItem } from '../editor/timetable-item'

export default {
  components: {
  },
  props: {
    draftTitle: { type: String, default: "" },
    draftDescription: { type: String, default: "" }
  },
  data() {
    return {}
  },
  methods: {
    addItem() {
      const title = this.draftTitle
      const description = this.draftDescription
      const item = new TimetableItem(title, description)
      this.$emit('create', item)
    }
  }
}
</script>
