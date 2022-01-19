<template>
    <div id="recognizerUI"></div>
</template>

<script>
import DCE from '../dce'
export default {
    name: 'Video',
    mounted() {
        this.init()
    },
    methods: {
        async init() {
            let enhancer = await DCE.createInstance();
            this.$store.commit('setEnhancer',enhancer);
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
            this.$store.state.enhancer.on("cameraOpen", callbackCameraOpen);
            this.$store.state.enhancer.on("cameraClose", callbackCameraClose);
            this.$store.state.enhancer.on("cameraChange", callbackCameraChange);
            this.$store.state.enhancer.on("resolutionChange", callbackResolutionChange);
        }
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
