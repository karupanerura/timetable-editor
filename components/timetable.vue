<template>
  <div>
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
      ><br>
      <button type="submit">
        add
      </button><br>
    </form>

    <grid-layout
      :layout.sync="items"
      :col-num="columns"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="false"
      :margin="[0, 0]"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="(timespan, index) in timespans"
        :key="timespan.i"
        :x="0"
        :y="index"
        :w="1"
        :h="1"
        :i="'timespan['+index+']'"
        :is-draggable="false"
        :is-resizable="false"
      >
        <div class="item">
          {{ timespan.toString() }}
        </div>
      </grid-item>
      <grid-item
        v-for="item in items"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="'item['+item.i+']'"
        :class="{ 'focused': focusedItemId == item.i }"
      >
        <div class="item" @click="selectItem(item)">
          {{ item.title }}
          <small>{{ item.description }}</small>
        </div>
      </grid-item>
    </grid-layout>
  </div>
</template>

<style scoped>
.vue-grid-layout {
  background: #eee;
  width: 100%;
  height: 100%;
  margin-bottom: 32px;
}

.vue-grid-item.resizing {
  opacity: 0.9;
}

.vue-grid-item.static {
  background: #cce;
}

.vue-grid-item.focused {
  background: #999;
}

.item {
  height: 100%;
  width: 100$;
}
</style>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout'

export default {
  components: {
    GridLayout,
    GridItem
  },
  props: {
    tracks: { type: Number, default: 2 },
    timespans: { type: Array, default: () => [] }
  },
  data() {
    return {
      items: [],
      draftTitle: '',
      draftDescription: '',
      focusedItemId: null
    }
  },
  computed: {
    columns() {
      return this.tracks + 1
    }
  },
  methods: {
    addItem() {
      const title = this.draftTitle
      const description = this.draftDescription
      const item = new Item(title, description)
      console.log(`addItem: ${item.title}`)
      this.items.push(item)
    },
    selectItem(item) {
      console.log(`selectItem: ${item.title}`)
      this.focusedItemId = item.i
    }
  }
}

const nextItemID = (id => () => ++id)(0)

class Item {
  constructor(title, description) {
    const id = nextItemID()
    this.title = title
    this.description = description
    this.x = 1
    this.y = id - 1
    this.w = 1
    this.h = 1
    this.i = id
  }
}
</script>
