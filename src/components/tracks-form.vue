<template>
  <form action="javascript:void(0)">
    tracks: <input
      v-model="tracks"
      type="number"
      name="tracks"
      min="2"
      max="8"
    >
  </form>
</template>

<script>
export default {
  props: {
    tracks: { type: String, default: '2' },
  },
  data() {
    return {}
  },
  watch: {
    tracks () {
      this.$emit('update:tracks', this.tracks)
    }
  }
}
</script>
