<template>
  <div class="tracks">
    <div v-for="track in tracks" :key="track" class="track">
      <p class="title">Track {{ track }}</p>
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
  border: solid 1px rgba(0, 0, 0, 64);
  padding: 12px;
  text-align: center;
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
