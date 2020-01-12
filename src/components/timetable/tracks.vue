<template>
  <div class="tracks">
    <div v-for="track in tracks" :key="track" class="track">
      {{ track }}
    </div>
  </div>
</template>

<style scoped>
.tracks {
  display: table;
  width: 100%;
  height: 64px;
}

.track {
  display: table-cell;
}
</style>

<script>
function* range(begin, end, interval = 1) {
  for (let i = begin; i <= end; i += interval) {
    yield i
  }
}

export default {
  components: {
  },
  props: {
    count: { type: Number, default: 2 }
  },
  data() {
    return {}
  },
  computed: {
    tracks() {
      return range(1, this.count)
    }
  }
}
</script>
