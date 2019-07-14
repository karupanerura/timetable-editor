<template>
  <grid-layout
    :layout.sync="layout"
    :col-num="columns"
    :max-rows="rows"
    :margin="[0, 0]"
    :row-height="rowHeight"
    :is-draggable="true"
    :is-resizable="true"
    :use-css-transforms="true"
  >
    <grid-item
      v-for="grid in layout"
      :key="grid.i"
      :x="grid.x"
      :y="grid.y"
      :w="grid.w"
      :h="grid.h"
      :i="grid.i"
    >
      {{ grid.item.title }}
      <small>{{ grid.item.description }}</small>
    </grid-item>
  </grid-layout>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout'

const GridCache = new Map()

class TimetableItemGrid {
  constructor(item) {
    this.item = item
    this.x = 0
    this.y = 0
    this.w = 1
    this.h = 1
    this.i = `item[${item.id}]`
  }

  static getOrCreate(item) {
    const key = `item[${item.id}]`
    if (GridCache.has(key)) {
      return GridCache.get(key)
    }

    const grid = new TimetableItemGrid(item)
    GridCache.set(key, grid)
    return grid
  }
}

export default {
  components: {
    GridLayout, GridItem
  },
  props: {
    items: { type: Array, default: () => [] },
    columns: { type: Number, default: 2 },
    rows: { type: Number, default: 2 },
    rowHeight: { type: Number, default: 64 }
  },
  data() {
    return {}
  },
  computed: {
    layout() {
      return this.items.map(TimetableItemGrid.getOrCreate)
    }
  }
}
</script>
