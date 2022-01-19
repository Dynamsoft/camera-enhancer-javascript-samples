<template>
    <footer>
        <div class="btn-group">
            <button class="open-camera" @click="openCamera">open camera</button>
            <button class="get-frame" @click="getFrame">get frame</button>
            <select name="decorator" id="decorator" v-model="decoratorValue" :disabled="this.$store.state.decoratorIsDisabled" @change="decoratorChange">
                <option value="decorator">setViewDecorator</option>
                <option value="rectangle">rectangle</option>
                <option value="focus">focus</option>
                <option value="crossline">crossline</option>
                <option value="crosshair">crosshair</option>
            </select>
            <select name="LineWidth" id="LineWidth" v-model="lineWidthValue" :disabled="this.$store.state.lineWidthIsDisabled" @change="lineWidthChange">
                <option value="5">setViewDecoratorLineWidth</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </select>
            <select name="StrokeStyle" id="StrokeStyle" v-model="strokeStyleValue" :disabled="this.$store.state.strokeStyleIsDisabled" @change="strokeStyleChange">
                <option value="rgba(254,142,20)">setViewDecoratorStrokeStyle</option>
                <option value="rgba(135, 206, 235)">skyblue</option>
                <option value="rgba(255, 0, 0)">red</option>
                <option value="rgba(128, 0, 128)">purple</option>
            </select>
            <select name="FillStyle" id="FillStyle" v-model="fillStyleValue" :disabled="this.$store.state.fillStyleIsDisabled" @change="fillStyleChange">
                <option value="transparent">setViewDecoratorFillStyle</option>
                <option value="rgba(135, 206, 235, 0.3)">skyblue</option>
                <option value="rgba(255, 0, 0, 0.3)">red</option>
                <option value="rgba(128, 0, 128, 0.3)">purple</option>
            </select>
            <select name="MaskFillStyle" id="MaskFillStyle" v-model="maskFillStyleValue" :disabled="this.$store.state.maskFillStyleIsDisabled" @change="maskFillStyleChange">
                <option value="transparent">setViewDecoratorMaskFillStyle</option>
                <option value="rgba(135, 206, 235, 0.3)">skyblue</option>
                <option value="rgba(255, 0, 0, 0.3)">red</option>
                <option value="rgba(128, 0, 128, 0.3)">purple</option>
            </select>
        </div>
        <div class="frame">
            <div class="set-frame">
                <input type="number" placeholder="scan region left" v-model="scanRegionLeft">
                <input type="number" placeholder="scan region right" v-model="scanRegionRight">
                <select id="unit-selection" v-model="unitSelection">
                    <option value="%">%</option>
                    <option value="px">px</option>
                </select>
                <input type="number" placeholder="scan region top" v-model="scanRegionTop">
                <input type="number" placeholder="scan region bottom" v-model="scanRegionBottom">
                <button class="set-scan-region" @click="setScanRegion">set</button>
            </div>
            <div class="show-frame"></div>
        </div>
    </footer>
    <div></div>
</template>

<script lang="ts">
import {reactive, ref} from 'vue'
import { useStore } from 'vuex'
export default {
    name: 'FooterControl',
    setup() {
        let area = reactive({x: 10, y:10, width:80, height:80});
        let decoratorValue = ref('decorator');
        let lineWidthValue = ref('5');
        let strokeStyleValue = ref('rgba(254,142,20)');
        let fillStyleValue = ref('transparent');
        let maskFillStyleValue = ref('transparent');
        let scanRegionLeft = ref('');
        let scanRegionRight = ref('');
        let scanRegionTop = ref('');
        let scanRegionBottom = ref('');
        let unitSelection = ref('%');
        const store = useStore()
        
        let openCamera = async () => {  
            if(store.state.enhancer.isOpen()) { 
                return;
            } else {
                let rec = document.querySelector('#recognizerUI') as any
                rec.appendChild(store.state.enhancer.getUIElement());
                
                await store.state.enhancer.open(true);
                // A decorator must be set to select a style
                if(store.state.enhancer.getViewDecorator().type.length !== 0) {
                    store.state.lineWidthIsDisabled = false;
                    store.state.strokeStyleIsDisabled = false;
                    store.state.fillStyleIsDisabled = false;
                    store.state.maskFillStyleIsDisabled = false;
                }
                store.state.decoratorIsDisabled = false;
            }
        }

        let getFrame = async () => {
            if(!store.state.enhancer.isOpen()) {
                return;
            } else {
                let frameData = store.state.enhancer.getFrame();
                (document.querySelector('.show-frame') as any).innerHTML = '';
                frameData.canvas.style.height = '100%';
                (document.querySelector('.show-frame') as any).appendChild(frameData.canvas);
            }
        }

        let decoratorChange = ():void => {
            // if decorator is crossline or crosshair, can not set FillStyle and MaskFillStyle
            if(decoratorValue.value === 'crossline' || decoratorValue.value === 'crosshair') {
                store.state.lineWidthIsDisabled = false;
                store.state.strokeStyleIsDisabled = false;
                store.state.fillStyleIsDisabled = true;
                store.state.maskFillStyleIsDisabled = true;
            } else if(decoratorValue.value === 'rectangle' || decoratorValue.value === 'focus') {
                store.state.lineWidthIsDisabled = false;
                store.state.strokeStyleIsDisabled = false;
                store.state.fillStyleIsDisabled = false;
                store.state.maskFillStyleIsDisabled = false;
            } else if(decoratorValue.value === 'decorator') {
                store.state.lineWidthIsDisabled = true;
                store.state.strokeStyleIsDisabled = true;
                store.state.fillStyleIsDisabled = true;
                store.state.maskFillStyleIsDisabled = true;
            }
            store.state.enhancer.setViewDecorator(decoratorValue.value, area);
        }

        let lineWidthChange = ():void => {
            let DecoratorInfo = store.state.enhancer.getViewDecorator();
            store.state.enhancer.setViewDecoratorLineWidth(DecoratorInfo.type[0],parseInt(lineWidthValue.value));
        }

        let strokeStyleChange = ():void => {
            let DecoratorInfo = store.state.enhancer.getViewDecorator();
            store.state.enhancer.setViewDecoratorStrokeStyle(DecoratorInfo.type[0],strokeStyleValue.value);
        }

        let fillStyleChange = ():void => {
            let DecoratorInfo = store.state.enhancer.getViewDecorator();
            store.state.enhancer.setViewDecoratorFillStyle(DecoratorInfo.type[0],fillStyleValue.value);
        }

        let maskFillStyleChange = ():void => {
            let DecoratorInfo = store.state.enhancer.getViewDecorator();
            store.state.enhancer.setViewDecoratorMaskFillStyle(DecoratorInfo.type[0],maskFillStyleValue.value);
        }

        let setScanRegion = ():void => {
            // set scan region
            store.state.enhancer.setScanRegion({
                regionLeft: parseInt(scanRegionLeft.value) || 0,
                regionTop: parseInt(scanRegionTop.value) || 0, 
                regionRight: parseInt(scanRegionRight.value) || 100, 
                regionBottom: parseInt(scanRegionBottom.value) || 100, 
                // if true use %, if false use px
                regionMeasuredByPercentage: unitSelection.value === '%' ? true : false
            });
        }

        return {
            decoratorValue,
            lineWidthValue,
            strokeStyleValue,
            fillStyleValue,
            maskFillStyleValue,
            scanRegionLeft,
            scanRegionRight,
            scanRegionTop,
            scanRegionBottom,
            unitSelection,
            openCamera,
            getFrame,
            decoratorChange,
            lineWidthChange,
            strokeStyleChange,
            fillStyleChange,
            maskFillStyleChange,
            setScanRegion
        }
    },
}
</script>

<style lang="less" scoped>
footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 30%;
    display: flex;
    border-top: 1px solid black;
    text-align: center;

    .btn-group {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border-right: 1px solid black;
        padding: 0 5px;
        width: 30%;
    }

    .btn-group button {
        height: 15%;
        border-radius: 5px;
        background-color: rgb(211,211,211);
    }

    .frame {
        width: 70%;
        height: 100%;
        display: flex;
        flex-direction: column;

        .set-frame {
            height: 25%;
            border-bottom: 1px solid black;
            display: flex;
            flex-wrap: wrap;

            input {
                width: 40%;
            }

            .set-scan-region {
                width: 20%;
                border: 1px solid black;
            }
            
            select {
                width: 20%;
            }
        }

        .show-frame {
            height: 75%;
        }
    }
}
</style>
