<template>
  <div class="timespans">
    <div v-for="timespan in items" :key="timespan.toString()" class="timespan">
      <time>{{ timespan.beginsTime }}</time> ~ <time>{{ timespan.endsTime }}</time>
    </div>
  </div>
</template>

<style scoped>
.timespans {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
}

.timespan {
  height: 64px;
}
</style>

<script>
export default {
  components: {
  },
  props: {
    items: { type: Array, default: () => [] }
  },
  data() {
    return {}
  }
}
</script>
