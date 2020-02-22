<template>
  <div id="app">
    <img alt="logo" src="logo.png">
    <h1>vue-audio-visual demo</h1>
    <blockquote>
      Audio source is from https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_1MG.mp3
    </blockquote>
    <hr/>
    <AvLines />
  </div>
</template>

<script>
import AvLines from './components/AvLines.vue'

export default {
  name: 'App',
  components: {
    AvLines
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
