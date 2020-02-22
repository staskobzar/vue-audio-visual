<template>
  <div>
    <h4><code>av-bars</code> component</h4>
    <a target="blank" href="https://github.com/staskobzar/vue-audio-visual/blob/master/demo/src/components/AvBars.vue">
    Example source code</a>
    <av-bars
      caps-color="#FFF"
      :bar-color="['#f00', '#ff0', '#0f0']"
      canv-fill-color="#000"
      :caps-height="2"
      audio-src="file_example_MP3_1MG.mp3"
      ></av-bars>
  </div>
</template>

<script>
export default {
  name: 'av-bars-demo'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
