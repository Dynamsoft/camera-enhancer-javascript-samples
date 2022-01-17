<template>
    <div id="recognizerUI"></div>
</template>

<script lang="ts">
import { onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex'
export default {
    name: 'Video',
    setup() {
        const store = useStore()
        
        let initSettings = async () => {
            (window as any).enhancer = await (window as any).Dynamsoft.DCE.CameraEnhancer.createInstance();
            const callbackCameraOpen = ():void => {
                console.log("camera opened");
            };
            // if close camera, should set the selection box to not selectable
            const callbackCameraClose = ():void => {
                console.log("camera closeed");
                store.state.decoratorIsDisabled = true;
                store.state.lineWidthIsDisabled = true;
                store.state.strokeStyleIsDisabled = true;
                store.state.fillStyleIsDisabled = true;
                store.state.maskFillStyleIsDisabled = true;
            };
            const callbackCameraChange = ():void => { 
                console.log("camera changed");
            };
            const callbackResolutionChange = ():void => {
                console.log("camera resolution changed");
            };
            (window as any).enhancer.on("cameraOpen", callbackCameraOpen);
            (window as any).enhancer.on("cameraClose", callbackCameraClose);
            (window as any).enhancer.on("cameraChange", callbackCameraChange);
            (window as any).enhancer.on("resolutionChange", callbackResolutionChange); 
        }

        onMounted(() => {
            initSettings()
        })
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