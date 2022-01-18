<template>
  <div id="app">
    <Video />
    <FooterControl />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Video from './components/Video.vue'
import FooterControl from './components/FooterControl.vue'

export default defineComponent({
  name: 'App',
  components: {Video, FooterControl}
});
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
}

button {
  border: 0;
}
</style>
