import { Component, OnInit, EventEmitter, Output, ElementRef } from '@angular/core';
import DCE from '../dce';
import { DrawingItem } from 'cube-dynamsoft-camera-enhancer';
@Component({
  selector: 'app-camera-enhancer',
  templateUrl: './camera-enhancer.component.html',
})
export class CameraEnhancerComponent implements OnInit {
  @Output() appendMessage = new EventEmitter();
  constructor(private elementRef: ElementRef) { }

  async ngOnInit(): Promise<void> {
    try {
      let enhancer = await DCE.createInstance();
      await enhancer.setUIElement(DCE.defaultUIElementURL);
      this.elementRef.nativeElement.appendChild(enhancer.getUIElement());
      await enhancer.open();
      const drawingLayer = enhancer.createDrawingLayer();
      drawingLayer.setMode("editor");
      const rect = new DrawingItem.DT_Rect(0, 0, 100, 100);
      drawingLayer.addDrawingItem(rect);
    } catch (ex) {
      // this.appendMessage.emit({ msg: ex.message, type: "error" });
      console.error(ex);
    }
  }
  async ngOnDestroy() {
    
  }
}
