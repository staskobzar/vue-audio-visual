<p align="center">
  <img src="https://github.com/staskobzar/vue-audio-visual/blob/master/static/logo.png?raw=true"/>
</p>

# vue-audio-visual

[![Node.js CI](https://github.com/staskobzar/vue-audio-visual/actions/workflows/node.js.yml/badge.svg)](https://github.com/staskobzar/vue-audio-visual/actions/workflows/node.js.yml)
[![codecov](https://codecov.io/gh/staskobzar/vue-audio-visual/branch/master/graph/badge.svg)](https://codecov.io/gh/staskobzar/vue-audio-visual)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/92c77d2548074f3d9165e3e45b5aa2a4)](https://www.codacy.com/gh/staskobzar/vue-audio-visual/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=staskobzar/vue-audio-visual&amp;utm_campaign=Badge_Grade)
[![MIT](https://img.shields.io/npm/l/vue-audio-visual.svg?maxAge=2592000)](https://github.com/staskobzar/vue-audio-visual/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/vue-audio-visual.svg)](https://www.npmjs.com/package/vue-audio-visual)

> Vue HTML5 audio visualization components

- [Overview](#overview)
- [Get started](#get-started)
  * [Install](#install)
  * [Use plugin](#use-plugin)
  * [Use component](#use-component)
  * [Composable functions](#composable-functions)
- [API details](#api)
  * [Common props](#common-props)
  * [Common events](#common-events)
  * [AvLine props](#avline-props)
  * [AvBars props](#avbars-props)
  * [AvCircle props](#avcircle-props)
  * [AvWaveform props](#avwaveform-props)
  * [AvMedia props](#avmedia-props)
- [Issues](#issues)
- [License](#license)

## UPDATE NOTES
:warning: Plugin current version is compatibale only with **Vue v3**. For Vue2 use plugin version 2.5.0. See [install](#install-and-setup) chapter for details.

## Overview
An audio spectrum visualizer plugin for [VueJS](https://vuejs.org/) framework. It is built with HTML5
[Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) and compatible with all browsers that support HTML5 audio API.
It provides several Vue components that allows to draw light and nice visualization for "audio" HTML elements.

---
> :heavy_exclamation_mark: Visit [**DEMO page**](https://staskobzar.github.io/vue-audio-visual/) for working examples.
---

_Usage examples_:

Component **AvLine**. Vue template name **&lt;av-line&gt;**
```html
    <av-line
      :line-width="2"
      line-color="lime"
      audio-src="/static/music.mp3"
    ></av-line>
```
This will create following element:

![AvLine Intro](https://github.com/staskobzar/vue-audio-visual/blob/master/static/overview-vav-line.png?raw=true)

Component **AvBars**. Vue template name **&lt;av-bars&gt;**
```html
    <av-bars
      caps-color="#FFF"
      :bar-color="['#f00', '#ff0', '#0f0']"
      canv-fill-color="#000"
      :caps-height="2"
      audio-src="/static/bach.mp3"
    ></av-bars>
```
This will create following element:

![AvBars Intro](https://github.com/staskobzar/vue-audio-visual/blob/master/static/overview-vav-bars.png?raw=true)

Component **AvCircle**. Vue template name **&lt;av-circle&gt;**
```html
    <av-circle
      :outline-width="0"
      :progress-width="5"
      :outline-meter-space="5"
      :playtime="true"
      playtime-font="18px Monaco"
      audio-src="/static/bach.mp3"
    ></av-circle>
```
This will create following element:

![AvCircle Intro](https://github.com/staskobzar/vue-audio-visual/blob/master/static/overview-vav-circle.png?raw=true)

Component **AvWaveform**. Vue template name **&lt;av-waveform&gt;**
```html
    <av-waveform
      audio-src="/static/bar.mp3"
    ></av-waveform>
```
This will create following waveform element:

![AvWaveform Intro](https://github.com/staskobzar/vue-audio-visual/blob/master/static/overview-vav-waveform.png?raw=true)

Component will pre-load audio content and generate clickable waveform.

Component **AvMedia**. Vue component **&lt;AvMedia&gt;**
```html
    <AvMedia
      :media="mediaObject" type="vbar"
    ></AvMedia>
```
This will create following media element:

![AvMedia Intro](https://user-images.githubusercontent.com/147280/201538832-e20b12bc-ac6f-4137-9346-cd6d9e30bdd1.png)

There are more media types. See details below.


## :gear: Get started

### Install
Install using npm
```
npm install --save vue-audio-visual
```
for Vue 2 install version 2.5.0
```
npm i -S vue-audio-visual@2.5.0
```

### Use plugin

Install plugin in main.js:
```typescript
import { createApp } from 'vue'
import App from './App.vue'
import { AVPlugin } from 'vue-audio-visual'

const app = createApp(App)
app.use(AVPlugin)

app.mount('#app')
```

Then anywhere is your app you can use it like this:
```html
  <av-bars
    src="/static/bach.mp3"
    bar-color="#CCC">
  </av-bars>
```

### Use component

Single component can be imported and used
```ts
<script setup lang="ts">
import { AVWaveform } from 'vue-audio-visual'
</script>

<template>
  <AVWaveform :src="http://foo.com/music.ogg" />
</template>
```

### Composable functions

Plugin provides composable "use" functions for each plugin component.
Actually, each component uses composable function inside. See, for example,
[line component](https://github.com/staskobzar/vue-audio-visual/blob/master/src/components/AVLine.vue).

Composable functions use audio and canvas element refs. It is handy when you need full access
to audio or canvas elements. In the same time it is easy to use:

```ts
<script setup lang="ts">
import { ref } from 'vue'
import { useAVBars } from 'vue-audio-visual'

const player = ref(null)
const canvas = ref(null)
const mySource = "./symphony.mp3"

// composable function useAVBars
useAVBars(player, canvas, { src: mySource, canvHeight: 40, canvWidth: 200, barColor: 'lime' })
</script>

<template>
  <div>
    <audio ref="player" :src="mySource" controls />
    <canvas ref="canvas" />
  </div>
</template>
```

## :gear: API

There are several components that comes with plugin. Here is the list of available plugins:
|  Name       | Component name | Composable function |
| ----------- | -------------- | ------------------- |
| av-bars     | AVBars         | useAVBars           |
| av-circle   | AvCircle       | useAVCircle         |
| av-line     | AVLine         | useAVLine           |
| av-media    | AVMedia        | useAVMedia          |
| av-waveform | AVWaveform     | useAVWaveform       |

There are props that are common for all components and special props for each component.
All props for components' names follow vue specs when using wiht composable functions.
Meaning when prop's name is "_foo-bar_" then in composable function parameter it is expected
to be "_fooBar_".

### Common props

<table>
  <thead>
    <tr>
      <th width="150">Name</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>src</td>
      <td><code>String</code></td>
      <td><code>null</code></td>
      <td>
        URL of Audio element src attribute. When provided creates audio element
        wrapped in "div".
      </td>
    </tr>
    <tr>
      <td><del>audio-sink-device-id</del></td>
      <td><del><code>String</code></del></td>
      <td><del><code>null</code></del></td>
      <td>
        <strong>Deprecated</strong>. Use composable function with direct access to audio element.
        <br/>
        <del>Id of the audio output device to be used as sink. When provided sets audio output device.</del>
      </td>
    </tr>
    <tr>
      <td><del>ref-link</del></td>
      <td><del><code>String</code></del></td>
      <td><del><code>null</code></del></td>
      <td>
        <strong>Deprecated</strong><br/>
        <del>
        Reference to parent audio element via Vue "ref" attribute. When set,
        then local audio element is not created and the plugin will connect
        audio analyser to parent audio element. Multiple plugin instances
        can connect to the same audio element (see example above).</del>
      </td>
    </tr>
    <tr>
      <td>audio-controls</td>
      <td><code>Boolean</code></td>
      <td><code>true</code></td>
      <td>
        Audio element controls attribute. When provided should
        display audio element with controls.
      </td>
    </tr>
    <tr>
      <td><del>cors-anonym</del></td>
      <td><del><code>Boolean</code></del></td>
      <td><del><code>false</code></del></td>
      <td>
        <strong>Deprecated</strong>. Use composable function with direct access to audio element.
        <br/><del>
        Set CORS attribute for audio element. Set this attribute when using
        audio source is pointing to different host/domain. When set, parameter
        crossOrigin of audio element will be set to 'anonymous'.</del>
      </td>
    </tr>
    <tr>
      <td><del>audio-class</del></td>
      <td><del><code>String</code></del></td>
      <td><del><code>null</code></del></td>
      <td>
      <strong>Deprecated</strong>. Use composable function with direct access to audio element.
      <br/>
      <del>Audio element css class name.</del>
      </td>
    </tr>
    <tr>
      <td><del>canv-class</del></td>
      <td><del><code>String</code></del></td>
      <td><del><code>null</code></del></td>
      <td>
      <strong>Deprecated</strong>. Use composable function with direct access to audio element.
      <br/>
      <del>Canvas element css class name.</del></td>
    </tr>
    <tr>
      <td><del>canv-top</del></td>
      <td><del><code>Boolean</code></del></td>
      <td><del><code>false</code></del></td>
      <td>
      <strong>Deprecated</strong>. Use composable function with direct access to audio element.
      <br/>
      <del>By default plugin creates "audio" element wrapped in "div"
          and puts "canvas" element below. When "canv-top" is "true" then
          "canvas" element is set on top. Example:
          <code> :canv-top="true"</code> or
          <code> v-bind:canv-top="true"</code></del>
      </td>
    </tr>
    <tr>
      <td>canv-fill-color</td>
      <td><code>String</code></td>
      <td><code>null</code></td>
      <td>Canvas fill background RGB color.
          Default is null, which makes background transperent.
          Examples:<br/>
          <code>canv-fill-color="#00AAFF"</code><br/>
      </td>
    </tr>
  </tbody>
</table>

### Common events

**Deprecated**. Use composable function with direct access to audio element.

<del>
<table>
  <thead>
    <tr>
      <th width="150">Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>playing</td>
      <td>
        Emitted when audio starts playing.
      </td>
    </tr>
    <tr>
      <td>paused</td>
      <td>
        Emitted when audio is paused.
      </td>
    </tr>
    <tr>
      <td>ended</td>
      <td>
        Emitted when audio is ended.
      </td>
    </tr>
    </tbody>
</table>
</del>

### AVLine props

<table>
  <thead>
    <tr>
      <th width="150">Name</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>canv-width</td>
      <td><code>Number</code></td>
      <td><code>300</code></td>
      <td>Canvas element width. Default 300.
          Example: <code>:canv-width="600"</code>
      </td>
    </tr>
    <tr>
      <td>canv-height</td>
      <td><code>Number</code></td>
      <td><code>80</code></td>
      <td>Canvas element height. Default 80.
          Example: <code>:canv-height="120"</code>
      </td>
    </tr>
    <tr>
      <td>line-width</td>
      <td><code>Number</code></td>
      <td><code>2</code></td>
      <td>Graph line width in px. Integer or float number.
          Example: <code>:line-width="0.5"</code>
      </td>
    </tr>
    <tr>
      <td>line-color</td>
      <td><code>String</code>, <code>Array</code></td>
      <td><code>#9F9</code></td>
      <td>Graph line color. Can be string RGB color or Array of RGB color.
          When Array is given, plugin creates linear gradient and set it as background.
          Array value should be binded.
          Examples:<br/>
          <code>line-color="#00AAFF"</code><br/>
          <code>:line-color="['#FFF', 'rgb(0,255,127)', '#00f']"</code>
      </td>
    </tr>
    <tr>
      <td>fft-size</td>
      <td><code>Number</code></td>
      <td><code>128</code></td>
      <td>Represents the window size in samples that is used when performing
          a Fast Fourier Transform (FFT) to get frequency domain data.<br/>
          Must be power of 2 between 2<sup>5</sup> and 2<sup>15</sup>.
          Example: <code>:fft-size="512"</code>
      </td>
    </tr>
  </tbody>
</table>

Composable function:
```ts
function useAVLine<T extends object>(
  player: Ref<HTMLAudioElement | null>,
  canvas: Ref<HTMLCanvasElement | null>,
  props: T
)
```

### AVBars props

<table>
  <thead>
    <tr>
      <th width="150">Name</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>canv-width</td>
      <td><code>Number</code></td>
      <td><code>300</code></td>
      <td>Canvas element width. Default 300.
          Example: <code>:canv-width="600"</code>
      </td>
    </tr>
    <tr>
      <td>canv-height</td>
      <td><code>Number</code></td>
      <td><code>80</code></td>
      <td>Canvas element height. Default 80.
          Example: <code>:canv-height="120"</code>
      </td>
    </tr>
    <tr>
      <td>bar-width</td>
      <td><code>Number</code></td>
      <td><code>5</code></td>
      <td>Width of bars in pixels. Example: <code>:bar-width="12"</code>
      </td>
    </tr>
    <tr>
      <td>bar-space</td>
      <td><code>Number</code></td>
      <td><code>1</code></td>
      <td>Space between bars. Example: <code>:bar-space="1.6"</code></td>
    </tr>
    <tr>
      <td>bar-color</td>
      <td><code>String</code>, <code>Array</code></td>
      <td><code>#0A0AFF</code></td>
      <td>Bar fill color. Can be string RGB color or canvas gradients array.<br/>
          Examples:<br/>
          <code>bar-color="#00AAFF"</code><br/>
          <code>:bar-color="['#FFF', 'rgb(0,255,127)', 'green']"</code>
      </td>
    </tr>
    <tr>
      <td>caps-height</td>
      <td><code>Number</code></td>
      <td><code>0</code></td>
      <td>Create caps on bars with given height in pixels.
          When zero no caps created. Example: <code>:caps-height="2"</code>
      </td>
    </tr>
    <tr>
      <td>caps-drop-speed</td>
      <td><code>Number</code></td>
      <td><code>0.9</code></td>
      <td>Caps drop down animation speed. The higher nubmer the faster caps are going down.
          Example: <code>:caps-drop-speed="0.5"</code>
      </td>
    </tr>
    <tr>
      <td>caps-color</td>
      <td><code>String</code></td>
      <td><code>#A0A0FF</code></td>
      <td>Caps rectangles RGB color.
          Example: <code>caps-color="lime"</code>
      </td>
    </tr>
    <tr>
      <td>brick-height</td>
      <td><code>Number</code></td>
      <td><code>0</code></td>
      <td>Draw bar as bricks when height is set and not zero.<br/>
          Example: <code>:brick-height="6"</code><br/>
          <img src="https://github.com/staskobzar/vue-audio-visual/blob/master/static/vav-bars-bricks.png?raw=true" />
      </td>
    </tr>
    <tr>
      <td>brick-space</td>
      <td><code>Number</code></td>
      <td><code>1</code></td>
      <td>Space between bricks. Example: <code>:brick-space="2"</code>
      </td>
    </tr>
    <tr>
      <td>symmetric</td>
      <td><code>Boolean</code></td>
      <td><code>false</code></td>
      <td>Draw bars symmetric to canvas vertical center.
          Example: <code>:symmetric="true"</code><br/>
          <img src="https://github.com/staskobzar/vue-audio-visual/blob/master/static/vav-bars-symm.png?raw=true" />
      </td>
    </tr>
    <tr>
      <td>fft-size</td>
      <td><code>Number</code></td>
      <td><code>1024</code></td>
      <td>Represents the window size in samples that is used when performing
          a Fast Fourier Transform (FFT) to get frequency domain data.<br/>
          Must be power of 2 between 2<sup>5</sup> and 2<sup>15</sup>.
          Example: <code>:fft-size="2048"</code>
      </td>
    </tr>
  </tbody>
</table>

Composable function
```ts
function useAVBars<T extends object>(
  player: Ref<HTMLAudioElement | null>,
  canvas: Ref<HTMLCanvasElement | null>,
  props: T
)
```

### AVCircle props

<table>
  <thead>
    <tr>
      <th width="150">Name</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>canv-width</td>
      <td><code>Number</code></td>
      <td><code>100</code></td>
      <td>Canvas element width.
          Example: <code>:canv-width="600"</code>
      </td>
    </tr>
    <tr>
      <td>canv-height</td>
      <td><code>Number</code></td>
      <td><code>100</code></td>
      <td>Canvas element height.
          Example: <code>:canv-height="120"</code>
      </td>
    </tr>
    <tr>
      <td>radius</td>
      <td><code>Number</code></td>
      <td><code>0</code></td>
      <td>Base circle radius. If zero, then will be calculated from canvas
          width: (canv-width / 2) * 0.7
          Example: <code>:radius="20"</code>
      </td>
    </tr>
    <tr>
      <td>line-width</td>
      <td><code>Number</code></td>
      <td><code>1</code></td>
      <td>Frequency bit line width to draw.
          Example: <code>:line-width="0.4"</code>
      </td>
    </tr>
    <tr>
      <td>line-space</td>
      <td><code>Number</code></td>
      <td><code>1</code></td>
      <td>Space between lines to draw.
          Example: <code>:line-space="2"</code>
      </td>
    </tr>
    <tr>
      <td>outline-color</td>
      <td><code>String</code></td>
      <td><code>#0000FF</code></td>
      <td>Outline (contour) style RGB color.
          Example: <code>outline-color="rgb(0,255,0)"</code>
      </td>
    </tr>
    <tr>
      <td>outline-width</td>
      <td><code>Number</code></td>
      <td><code>0.3</code></td>
      <td>Outline (contour) line width. Float value.
          Example: <code>:outline-width="1"</code>
      </td>
    </tr>
    <tr>
      <td>bar-width</td>
      <td><code>Number</code></td>
      <td><code>1</code></td>
      <td>Frequency graph bar width.
          Example: <code>:bar-width="1"</code>
      </td>
    </tr>
    <tr>
      <td>bar-length</td>
      <td><code>Number</code></td>
      <td><code>0</code></td>
      <td>Frequency graph bar length/height.
          Default is a difference between radius and canvas width.
          Example: <code>:bar-length="27"</code>
      </td>
    </tr>
    <tr>
      <td>bar-color</td>
      <td><code>String</code>, <code>Array</code></td>
      <td><code>[#FFF,#00F]</code></td>
      <td>Bar style RGB color or radient gradient when array.
          Example: <code>:bar-color="#12AA55"</code>
      </td>
    </tr>
    <tr>
      <td>progress</td>
      <td><code>Boolean</code></td>
      <td><code>true</code></td>
      <td>Draw playtime progress meter.
          Example: <code>:progress="false"</code>
      </td>
    </tr>
    <tr>
      <td>progress-width</td>
      <td><code>Number</code></td>
      <td><code>1</code></td>
      <td>Playtime progress meter width.
          Example: <code>:progress-width="2.4"</code>
      </td>
    </tr>
    <tr>
      <td>progress-color</td>
      <td><code>String</code></td>
      <td><code>#0000FF</code></td>
      <td>Playtime progress meter color.
          Example: <code>:progress-color="green"</code>
      </td>
    </tr>
    <tr>
      <td>progress-clockwise</td>
      <td><code>Boolean</code></td>
      <td><code>false</code></td>
      <td>Playtime progress meter arc draw direction.
          Example: <code>:progress-clockwise="true"</code>
      </td>
    </tr>
    <tr>
      <td>outline-meter-space</td>
      <td><code>Number</code></td>
      <td><code>3</code></td>
      <td>Space between outline and progress meter. The bigger the closer to the circle centre.
          Example: <code>:outline-meter-space="1"</code>
      </td>
    </tr>
    <tr>
      <td>playtime</td>
      <td><code>Boolean</code></td>
      <td><code>false</code></td>
      <td>Draw played time as text in the center of the circle.
          Example: <code>:playtime="true"</code>
      </td>
    </tr>
    <tr>
      <td>playtime-font</td>
      <td><code>String</code></td>
      <td><code>14px Monaco</code></td>
      <td>Played time print font.
          Example: <code>playtime-font="18px monospace"</code>
      </td>
    </tr>
    <tr>
      <td>playtime-color</td>
      <td><code>String</code></td>
      <td><code>#00f</code></td>
      <td>Played time font color.
          Example: <code>playtime-color="green"</code>
      </td>
    </tr>
    <tr>
      <td>rotate-graph</td>
      <td><code>Boolean</code></td>
      <td><code>false</code></td>
      <td>Rotate graph clockwise enable.
          Example: <code>:rotate-graph="true"</code>
      </td>
    </tr>
    <tr>
      <td>rotate-speed</td>
      <td><code>Number</code></td>
      <td><code>0.001</code></td>
      <td>Rotate graph speed.
          Example: <code>:rotate-speed="0.2"</code>
      </td>
    </tr>
    <tr>
      <td>fft-size</td>
      <td><code>Number</code></td>
      <td><code>1024</code></td>
      <td>Represents the window size in samples that is used when performing
          a Fast Fourier Transform (FFT) to get frequency domain data.<br/>
          Must be power of 2 between 2<sup>5</sup> and 2<sup>15</sup>.
          Example: <code>:fft-size="2048"</code>
      </td>
    </tr>
  </tbody>
</table>

Composable function
```ts
function useAVCircle<T extends object>(
  player: Ref<HTMLAudioElement | null>,
  canvas: Ref<HTMLCanvasElement | null>,
  props: T
)
```

### AVWaveform props

<table>
  <thead>
    <tr>
      <th width="150">Name</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>canv-width</td>
      <td><code>Number</code></td>
      <td><code>500</code></td>
      <td>Canvas element width.
          Example: <code>:canv-width="600"</code>
      </td>
    </tr>
    <tr>
      <td>canv-height</td>
      <td><code>Number</code></td>
      <td><code>80</code></td>
      <td>Canvas element height.
          Example: <code>:canv-height="120"</code>
      </td>
    </tr>
    <tr>
      <td>played-line-width</td>
      <td><code>Number</code></td>
      <td><code>0.5</code></td>
      <td>Waveform line width for played segment of audio.
          Example: <code>:playtime-line-width="0.8"</code>
      </td>
    </tr>
    <tr>
      <td>played-line-color</td>
      <td><code>String</code></td>
      <td><code>navy</code></td>
      <td>Waveform line color for played segment of audio.
          Example: <code>:playtime-line-color="#ABC123"</code>
      </td>
    </tr>
    <tr>
      <td>noplayed-line-width</td>
      <td><code>Number</code></td>
      <td><code>0.5</code></td>
      <td>Waveform line width for not yet played segment of audio
          Example: <code>:noplayed-line-width="1"</code>
      </td>
    </tr>
    <tr>
      <td>noplayed-line-color</td>
      <td><code>String</code></td>
      <td><code>lime</code></td>
      <td>Waveform line color for not yet played segment of audio.
          Example: <code>:noplayed-line-color="grey"</code>
      </td>
    </tr>
    <tr>
      <td>playtime</td>
      <td><code>Boolean</code></td>
      <td><code>true</code></td>
      <td>Display played time next to progress slider.
          Example: <code>:playtime="false"</code>
      </td>
    </tr>
    <tr>
      <td>playtime-with-ms</td>
      <td><code>Boolean</code></td>
      <td><code>true</code></td>
      <td>Display milliseconds in played when true. For example: 02:55.054.
          Example: <code>:playtime-with-ms="false"</code>
      </td>
    </tr>
    <tr>
      <td>playtime-font-size</td>
      <td><code>Number</code></td>
      <td><code>12</code></td>
      <td>Played time print font size in pixels.
          Example: <code>:playtime-font-size="14"</code>
      </td>
    </tr>
    <tr>
      <td>playtime-font-family</td>
      <td><code>String</code></td>
      <td><code>monospace</code></td>
      <td>Played time print font family.
          Example: <code>:playtime-font-family="monaco"</code>
      </td>
    </tr>
    <tr>
      <td>playtime-font-color</td>
      <td><code>String</code></td>
      <td><code>grey</code></td>
      <td>Played time print font RGB color string.
          Example: <code>:playtime-font-color="#00f"</code>
      </td>
    </tr>
    <tr>
      <td>playtime-text-bottom</td>
      <td><code>Boolean</code></td>
      <td><code>false</code></td>
      <td>Position playtime text bottom. Default on top.
          Example: <code>playtime-text-bottom</code>
      </td>
    </tr>
    <tr>
      <td>playtime-slider</td>
      <td><code>Boolean</code></td>
      <td><code>true</code></td>
      <td>Draw played time slider on the waveform.
          Example: <code>:playtime-slider="false"</code>
      </td>
    </tr>
    <tr>
      <td>playtime-slider-color</td>
      <td><code>String</code></td>
      <td><code>red</code></td>
      <td>Played slider color.
          Example: <code>:playtime-slider-color="#fafafa"</code>
      </td>
    </tr>
    <tr>
      <td>playtime-slider-width</td>
      <td><code>Number</code></td>
      <td><code>1</code></td>
      <td>Played slider width.
          Example: <code>:playtime-slider-width="2.5"</code>
      </td>
    </tr>
    <tr>
      <td>playtime-clickable</td>
      <td><code>Boolean</code></td>
      <td><code>true</code></td>
      <td>Allow click on waveform to change playtime.
          Example: <code>:playtime-clickable="false"</code>
      </td>
    </tr>
    <tr>
      <td>requester</td>
      <td><code>Object</code></td>
      <td><code>new axios instance</code></td>
      <td>Allow set a custom requester (axios/fetch) to be used.
          Example: <code>:requester="myCustomRequesterInstance"</code>
      </td>
    </tr>
  </tbody>
</table>

Composable function is using [useFetch](https://vueuse.org/core/usefetch/) from [@vueuse/core](https://vueuse.org/) package.
```useAVWaveform``` last argument is options for useFetch function.

```ts
export function useAVWaveform<T extends object>(
  player: Ref<HTMLAudioElement | null>,
  canvas: Ref<HTMLCanvasElement | null>,
  props: T,
  fetchOpts: UseFetchOptions = {}
)
```

### AVMedia props

Component expects ```MediaStream``` object. You can get it directly from ```navigator.mediaDevices``` or
from @vueuse/core library function [useUserMedia](https://vueuse.org/core/useUserMedia/). Live example
can be found in [App.vue](https://github.com/staskobzar/vue-audio-visual/blob/master/src/App.vue).

```ts
<script setup lang="ts">
import { AVMedia } from 'vue-audio-visual'
import { useUserMedia } from '@vueuse/core'
...
const { stream } = useUserMedia()
...
</script>

<template>
...
<AVMedia :media="stream" type="circle" />
...
</template>
```

<table>
  <thead>
    <tr>
      <th width="150">Name</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>media</td>
      <td><code>MediaStream</code></td>
      <td><code>none</code></td>
      <td>Required property. See example above.</td>
    </tr>
    <tr>
      <td>type</td>
      <td><code>String</code></td>
      <td><code>wform</code></td>
      <td>Type of media visualization. Available types: 'wform', 'circle', 'frequ' and 'vbar'.
      If not set or not recognized then 'wform' is set. See examples in demo. <br/>
          Example: <code>type="frequ"</code>
      </td>
    </tr>
    <tr>
      <td>canv-width</td>
      <td><code>Number</code></td>
      <td><code>null</code></td>
      <td>
        Canvas element width. Default value depends on plugin type:
        <ul>
          <li>circle: 80</li>
          <li>frequ: 300</li>
          <li>vbar: 50</li>
          <li>wform: 200</li>
        </ul>
        Example: <code>:canv-width="600"</code>
      </td>
    </tr>
    <tr>
      <td>canv-height</td>
      <td><code>Number</code></td>
      <td><code>null</code></td>
      <td>Canvas element height. Default value depends on plugin type:
        <ul>
          <li>circle: 80</li>
          <li>frequ: 80</li>
          <li>vbar: 20</li>
          <li>wform: 40</li>
        </ul>
          Example: <code>:canv-height="120"</code>
      </td>
    </tr>
    <tr>
      <td>canv-class</td>
      <td><code>String</code></td>
      <td><code>null</code></td>
      <td>Canvas element css class name.</td>
    </tr>
    <tr>
      <td>fft-size</td>
      <td><code>Number</code></td>
      <td><code>1024/8192</code></td>
      <td>Represents the window size in samples that is used when performing
          a Fast Fourier Transform (FFT) to get frequency domain data.
          Default 8192 for the type 'wform' or 1024 for 'frequ'
          <br/>
          Example: <code>:fft-size="512"</code>
      </td>
    </tr>
    <tr>
      <td>frequ-lnum</td>
      <td><code>Number</code></td>
      <td><code>60</code></td>
      <td>Number of vertical lines for 'frequ' type.
          Example: <code>:frequ-lnum="30"</code>
      </td>
    </tr>
    <tr>
      <td>frequ-line-cap</td>
      <td><code>Boolean</code></td>
      <td><code>false</code></td>
      <td>Draw lines of 'frequ' type with rounded caps.
          Example: <code>:frequ-line-cap="true"</code>
      </td>
    </tr>
    <tr>
      <td>frequ-direction</td>
      <td><code>String</code></td>
      <td><code>lr</code></td>
      <td>Direction to draw the frequency. Available values: 'lr' or 'mo' (left to right or middle out).
      If not set or not recognized then 'lr' is set. <br/>
          Example: <code>frequ-direction="mo"</code>
      </td>
    </tr>
    <tr>
      <td>line-color</td>
      <td><code>String</code></td>
      <td><code>#9F9</code></td>
      <td>Graph line RGB color.
          Examples:<br/>
          <code>line-color="#00AAFF"</code>
      </td>
    </tr>
    <tr>
      <td>line-width</td>
      <td><code>Number</code></td>
      <td><code>0.5 / 3</code></td>
      <td>Graph line width in px. Integer or float number.
      If not set then 0.5 for 'wform' type and 3 for 'frequ'
          Example: <code>:line-width="0.8"</code>
      </td>
    </tr>
     <tr>
      <td>radius</td>
      <td><code>Number</code></td>
      <td><code>0</code></td>
      <td>Base 'circle' radius.
          Example: <code>:radius="4"</code>
      </td>
    </tr>
    <tr>
      <td>connect-destination</td>
      <td><code>Boolean</code></td>
      <td><code>false</code></td>
      <td>Analyser to connect to audio context's destination.
      Avoid echo during playback.
          Example: <code>:connect-destination="true"</code>
      </td>
    </tr>
    <tr>
      <td>vbar-bg-color</td>
      <td><code>String</code></td>
      <td><code>#e1e1e1</code></td>
      <td>
      Background canvas color for 'vbar' type
      </td>
    </tr>
    <tr>
      <td>vbar-caps</td>
      <td><code>Boolean</code></td>
      <td><code>true</code></td>
      <td>
      Rounded bars for 'vbar' types
      </td>
    </tr>
    <tr>
      <td>vbar-space</td>
      <td><code>Number</code></td>
      <td><code>1</code></td>
      <td>
      Space between bars in 'vbar' type
      </td>
    </tr>
    <tr>
      <td>vbar-width</td>
      <td><code>Number</code></td>
      <td><code>4</code></td>
      <td>
      Width of bars in 'vbar' type
      </td>
    </tr>
    <tr>
      <td>vbar-fill-color</td>
      <td><code>String</code></td>
      <td><code>lime</code></td>
      <td>
      Color of bars in 'vbar' type
      </td>
    </tr>
    <tr>
      <td>vbar-right-color</td>
      <td><code>String</code></td>
      <td><code>#c0c0c0</code></td>
      <td>
      Color of bars on right side in 'vbar' type
      </td>
    </tr>
  </tbody>
</table>

Composable function:
```ts
function useAVMedia<T extends object>(
  canvas: Ref<HTMLCanvasElement | null>,
  props: T
)
```
## License

[MIT](http://opensource.org/licenses/MIT)
Copyright (c) 2018-present, Stas Kobzar
