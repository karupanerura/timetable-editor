<template>
  <form action="javascript:void(0)" @submit.prevent="addItem()">
    title: <input
      v-model="draftTitle"
      type="text"
      name="title"
      required
    ><br>
    description: <input
      v-model="draftDescription"
      type="text"
      name="description"
      required
    >
    <button type="submit">
      add
    </button>
  </form>
</template>

<script>
import { TimetableItem } from 'editor/timetable-item'

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
