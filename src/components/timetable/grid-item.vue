<template>
  <grid-item
    :key="grid.i"
    :x="grid.x"
    :y="grid.y"
    :w="grid.w"
    :h="grid.h"
    :i="grid.i"
  >
    <div @click.right.prevent.stop="focus(grid)" class="grid">
      <h4 class="title is-4">{{ grid.item.title }}</h4>
    </div>
  </grid-item>
</template>

<style scoped>
.grid {
  height: 100%;
  width: 100%;
  padding: 1rem;
  text-align: center;
  border : solid 1px rgba(0, 0, 0, 64);
}
</style>

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
