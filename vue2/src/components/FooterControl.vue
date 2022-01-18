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
                <option value="">setViewDecoratorLineWidth</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </select>
            <select name="StrokeStyle" id="StrokeStyle" v-model="strokeStyleValue" :disabled="this.$store.state.strokeStyleIsDisabled" @change="strokeStyleChange">
                <option value="">setViewDecoratorStrokeStyle</option>
                <option value="skyblue">skyblue</option>
                <option value="red">red</option>
                <option value="purple">purple</option>
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
</template>

<script>
export default {
    name: 'FooterControl',
    data() {
        return {
            area: {x: 10, y:10, width:80, height:80},
            frameData: [],
            decoratorValue: 'decorator',
            lineWidthValue: '',
            strokeStyleValue: '',
            fillStyleValue: 'transparent',
            maskFillStyleValue: 'transparent',
            scanRegionLeft: '',
            scanRegionRight: '',
            scanRegionTop: '',
            scanRegionBottom: '',
            unitSelection: '%'
        }
    },

    methods: {
        async openCamera() {
            await this.initSettings;
            if(enhancer.isOpen()) { 
                return;
            } else {
                document.querySelector('#recognizerUI').appendChild(enhancer.getUIElement());
                await enhancer.open(true);
                // A decorator must be set to select a style
                if(enhancer.getViewDecorator().type.length !== 0) {
                    this.$store.state.lineWidthIsDisabled = false
                    this.$store.state.strokeStyleIsDisabled = false
                    this.$store.state.fillStyleIsDisabled = false
                    this.$store.state.maskFillStyleIsDisabled = false
                }
                this.$store.state.decoratorIsDisabled = false
            }
        },
        
        async getFrame() {
            await this.initSettings;
            if(!enhancer.isOpen()) {
                return;
            } else {
                let frameData = enhancer.getFrame();
                this.frameData = frameData
                document.querySelector('.show-frame').innerHTML = '';
                frameData.canvas.id = 'frame-canvas'
                frameData.canvas.style.height = '100%'
                document.querySelector('.show-frame').appendChild(frameData.canvas);
            }
        },

        decoratorChange() {
            // if decorator is crossline or crosshair, can not set FillStyle and MaskFillStyle
            if(this.decoratorValue === 'crossline' || this.decoratorValue === 'crosshair') {
                this.$store.state.fillStyleIsDisabled = false;
                this.$store.state.maskFillStyleIsDisabled = false;
            } else if(this.decoratorValue === 'rectangle' || this.decoratorValue === 'focus') {
                this.$store.state.lineWidthIsDisabled = false;
                this.$store.state.strokeStyleIsDisabled = false;
                this.$store.state.fillStyleIsDisabled = false;
                this.$store.state.maskFillStyleIsDisabled = false;
            } else if(this.decoratorValue === 'decorator') {
                this.$store.state.lineWidthIsDisabled = true;
                this.$store.state.strokeStyleIsDisabled = true;
                this.$store.state.fillStyleIsDisabled = true;
                this.$store.state.maskFillStyleIsDisabled = true;
            }
            enhancer.setViewDecorator(this.decoratorValue, this.area);
        },

        lineWidthChange() {
            let DecoratorInfo = enhancer.getViewDecorator();
            if(this.lineWidthValue === '') {
                enhancer.setViewDecoratorLineWidth(DecoratorInfo.type[0],5);
            } else {
                enhancer.setViewDecoratorLineWidth(DecoratorInfo.type[0],parseInt(this.lineWidthValue));
            }
        },

        strokeStyleChange() {
            let DecoratorInfo = enhancer.getViewDecorator();
            if(this.strokeStyleValue === '') {
                enhancer.setViewDecoratorStrokeStyle(DecoratorInfo.type[0],'rgb(254,142,20)');
            } else {
                enhancer.setViewDecoratorStrokeStyle(DecoratorInfo.type[0],this.strokeStyleValue);
            }
        },

        fillStyleChange() {
            let DecoratorInfo = enhancer.getViewDecorator();
            enhancer.setViewDecoratorFillStyle(DecoratorInfo.type[0],this.fillStyleValue);
        },

        maskFillStyleChange() {
            let DecoratorInfo = enhancer.getViewDecorator();
            enhancer.setViewDecoratorMaskFillStyle(DecoratorInfo.type[0],this.maskFillStyleValue);
        },

        setScanRegion() {
            // set scan region
            enhancer.setScanRegion({
                regionLeft: parseInt(this.scanRegionLeft) || 0,
                regionTop: parseInt(this.scanRegionTop) || 0, 
                regionRight: parseInt(this.scanRegionRight) || 100, 
                regionBottom: parseInt(this.scanRegionBottom) || 100, 
                // if true use %, if false use px
                regionMeasuredByPercentage: this.unitSelection === '%' ? true : false
            });
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
