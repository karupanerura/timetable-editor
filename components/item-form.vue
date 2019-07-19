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

<script lang="ts">
import { Vue, Component, Provide, Emit } from 'vue-property-decorator'

import { TimetableItem } from '~/src/timetable-item'

@Component
export default class ItemForm extends Vue {
  @Provide() draftTitle = ''

  @Provide() draftDescription = ''

  @Emit('create')
  addItem(): TimetableItem {
    const title = this.draftTitle
    const description = this.draftDescription
    const item = new TimetableItem(title, description)
    return item
  }
}
</script>
