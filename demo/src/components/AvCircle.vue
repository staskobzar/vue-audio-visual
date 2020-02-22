<template>
  <div>
    <h4><code>av-circle</code> component</h4>
    <a target="blank" href="https://github.com/staskobzar/vue-audio-visual/blob/master/demo/src/components/AvBars.vue">
    Example source code</a>
    <av-circle
      :outline-width="0"
      :progress-width="5"
      :outline-meter-space="5"
      :playtime="true"
      playtime-font="18px Monaco"
      audio-src="file_example_MP3_1MG.mp3"
    ></av-circle>
  </div>
</template>

<script>
export default {
  name: 'av-line-demo'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
