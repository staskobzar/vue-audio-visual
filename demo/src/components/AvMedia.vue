<template>
  <div>
    <audio ref="player"></audio>
    <small>AvMedia type="frequ"</small>
    <av-media type="frequ" :media="media" line-color="darkorange"/>
    <small>AvMedia type="frequ" with frequ-direction="mo"</small>
    <av-media type="frequ" :media="media" line-color="darkorange"
      frequ-direction="mo"
      :frequ-lnum="60"/>
    <small>AvMedia type="wfrom"</small>
    <av-media type="wform" :media="media" line-color="blue"
      :canv-width="200" :canv-height="40"/>
    <small>AvMedia type="frequ" with frequ-lnum="3"</small>
    <av-media :media="media" type="frequ"
      :canv-width="30" :canv-height="30"
      :frequ-line-cap="true" :frequ-lnum="3"
      :line-width="6"/>
    <small>AvMedia type="circle" with line-width="3"</small>
    <av-media :media="media" type="circle"
      :canv-width="100" :canv-height="100"
      :line-width="3"/>
  </div>
</template>

<script>
export default {
  name: 'av-media-demo',
  data () {
    return {
      mtype: null,
      media: null
    }
  },
  mounted () {
    const audio = this.$refs.player
    const constraints = {
      audio: true,
      video: false
    }
    navigator.mediaDevices.getUserMedia(constraints)
      .then(media => {
        this.media = media
        audio.srcObject = media
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
