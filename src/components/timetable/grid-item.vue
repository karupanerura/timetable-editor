<template>
  <grid-item
    :key="grid.i"
    :x="grid.x"
    :y="grid.y"
    :w="grid.w"
    :h="grid.h"
    :i="grid.i"
  >
    <div @click.right.prevent.stop="focus(grid)" class="card">
      <header class="card-header">
        <p class="card-header-title">
          {{ grid.item.title }}
        </p>
      </header>
    </div>
  </grid-item>
</template>

<script>
import { GridItem } from 'vue-grid-layout'

export default {
  components: {
    GridItem,
  },
  props: {
    grid: { type: Object, default: () => {} },
  },
  data() {
    return {}
  },
  methods: {
    focus(grid) {
      this.$emit('focusgrid', grid)
    },
  },
}
</script>
