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
import { TimetableItem } from '~/src/timetable-item.js'

const nextItemId = (id => () => ++id)(0)

export default {
  data() {
    return {
      draftTitle: '',
      draftDescription: ''
    }
  },
  methods: {
    addItem() {
      const id = nextItemId()
      const title = this.draftTitle
      const description = this.draftDescription
      const item = new TimetableItem(id, title, description)
      this.$emit('create', item)
    }
  }
}
</script>
