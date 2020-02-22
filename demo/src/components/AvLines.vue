<template>
  <div>
    <h4><code>av-line</code> component</h4>
    <a target="blank" href="https://github.com/staskobzar/vue-audio-visual/blob/master/demo/src/components/AvLines.vue">
    Example source code</a>
    <av-line
      :line-width="2"
      line-color="lime"
      audio-src="file_example_MP3_1MG.mp3"
    ></av-line>
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
