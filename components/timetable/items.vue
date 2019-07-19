<template>
  <grid-layout
    :layout.sync="grids"
    :col-num="columns"
    :max-rows="rows"
    :margin="[0, 0]"
    :row-height="rowHeight"
    :is-draggable="true"
    :is-resizable="true"
    :use-css-transforms="true"
  >
    <grid-item
      v-for="grid in grids"
      :key="grid.i"
      :x="grid.x"
      :y="grid.y"
      :w="grid.w"
      :h="grid.h"
      :i="grid.i"
    >
      {{ grid.item.title }}<br>
      <small>{{ grid.item.description }}</small>
      <small>extras: {{ encodeJSON(grid.item.extras) }}</small>
      <small>grid: {{ encodeJSON(grid) }}</small>
    </grid-item>
  </grid-layout>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout'

export default {
  components: {
    GridLayout, GridItem
  },
  props: {
    grids: { type: Array, default: () => [] },
    columns: { type: Number, default: 2 },
    rows: { type: Number, default: 2 },
    rowHeight: { type: Number, default: 64 }
  },
  data() {
    return {}
  },
  methods: {
    encodeJSON: JSON.stringify
  }
}
</script>
