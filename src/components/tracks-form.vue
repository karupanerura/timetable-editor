<template>
  <div class="container content">
    <form action="javascript:void(0)">
      <div class="field">
        <label class="label">Tracks</label>
        <div class="control">
          <input
            v-model.number="tracks"
            class="input"
            type="number"
            name="tracks"
            min="2"
            max="8"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    tracks: { type: Number, default: 2 },
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
