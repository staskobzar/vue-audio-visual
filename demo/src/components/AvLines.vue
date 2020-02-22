<template>
  <div>
    <h3>Demo of av-line component</h3>
    <pre>
    See source code in file demo/src/components/AvLines.vue
    </pre>
    <av-line
      :line-width="2"
      line-color="lime"
      audio-src="/file_example_MP3_1MG.mp3"
    ></av-line>
  </div>
</template>

<script>
export default {
  name: 'av-lines'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
