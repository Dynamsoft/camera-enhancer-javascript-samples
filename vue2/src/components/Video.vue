<template>
    <div id="recognizerUI"></div>
</template>

<script>
import DCE from '../dce.js'
export default {
    name: 'Video',
    mounted() {
        this.initSettings()
    },
    methods: {
        async initSettings() {
            window.enhancer = await DCE.createInstance();
            const callbackCameraOpen = () => {
                console.log("camera opened");
            };
            // if close camera, should set the selection box to not selectable
            const callbackCameraClose = () => {
                console.log("camera closeed");
                this.$store.state.decoratorIsDisabled = true
                this.$store.state.lineWidthIsDisabled = true
                this.$store.state.strokeStyleIsDisabled = true
                this.$store.state.fillStyleIsDisabled = true
                this.$store.state.maskFillStyleIsDisabled = true
            };
            const callbackCameraChange = () => { 
                console.log("camera changed");
            };
            const callbackResolutionChange = () => {
                console.log("camera resolution changed");
            };
            enhancer.on("cameraOpen", callbackCameraOpen);
            enhancer.on("cameraClose", callbackCameraClose);
            enhancer.on("cameraChange", callbackCameraChange);
            enhancer.on("resolutionChange", callbackResolutionChange);
        },
    },
}
</script>

<style lang="less" scoped>
#recognizerUI {
    position: absolute;
    top: 0;
    bottom: 30%;
    left: 0;
    right: 0;
}
</style>
