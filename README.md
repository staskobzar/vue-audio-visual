<p align="center">
  <img src="/static/logo.png?raw=true"/>
</p>

# vue-audio-visual

[![Build Status](https://travis-ci.org/staskobzar/vue-audio-visual.svg?branch=master)](https://travis-ci.org/staskobzar/vue-audio-visual)
[![codecov](https://codecov.io/gh/staskobzar/vue-audio-visual/branch/master/graph/badge.svg)](https://codecov.io/gh/staskobzar/vue-audio-visual)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/bcc7e911360b4ef4a4d987ca5a846caa)](https://www.codacy.com/app/staskobzar/vue-audio-visual?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=staskobzar/vue-audio-visual&amp;utm_campaign=Badge_Grade)
![GPL](https://img.shields.io/badge/license-GPL_3-green.svg "License")

> Vue HTML5 audio visualization components

## Overview
An audio spectrum visualizer plugin for [VueJS](https://vuejs.org/) framework. It is built with HTML5
[Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) and compatible with all browsers that support HTML5 audio API.
It provides several Vue components that allows to draw light and nice visualization for "audio" HTML elements.

Component **AvLine**. Vue template name **&lt;av-line&gt;**
```html
    <av-line
      :line-width="2"
      line-color="lime"
      audio-src="/static/music.mp3"
    ></av-line>
```
This will create following element:

![AvLine Intro](/static/overview-vav-line.png)

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

![AvBars Intro](/static/overview-vav-bars.png)

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

![AvCircle Intro](/static/overview-vav-circle.png)

## Install and setup

Install using npm
```
npm install --save vue-audio-visual
```

Enable plugin in main.js:
```javascript
import Vue from 'vue'
import AudioVisual from 'vue-audio-visual'

Vue.use(AudioVisual)
```

Example of usage in App.vue or any other Vue component:
```html
  <av-bars
    audio-src="/static/bach.mp3">
  </av-bars>
```

## API

There are three components that comes with plugin: av-line, av-bars, av-circle.

There are a lot of **props** available to configurate each component.
The only mandatory "prop" to pass to component: **audio-src**.
Prop **audio-src** value should contain URL to media file. Example:
```
audio-src="http://example.com/media/song.mp3"
```

Plugin will generate "audio" to control media playback and "canvas" element for visualization.



## License

[MIT](http://opensource.org/licenses/MIT)
Copyright (c) 2018-present, Stas Kobzar
