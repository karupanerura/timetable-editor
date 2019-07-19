<template>
  <form action="javascript:void(0)">
    tracks: <input
      v-model="syncedTracks"
      type="number"
      name="tracks"
      min="2"
      max="8"
    >
  </form>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator'

@Component
export default class TracksForm extends Vue {
  @PropSync('tracks', { type: String, default: '2' }) syncedTracks: string
}
</script>
