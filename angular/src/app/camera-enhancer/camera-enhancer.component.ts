import { Component, OnInit, EventEmitter, Output, ElementRef } from '@angular/core';
import DCE from '../dce'
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
      this.elementRef.nativeElement.appendChild(enhancer.getUIElement());
      await enhancer.open();
    } catch (ex) {
      // this.appendMessage.emit({ msg: ex.message, type: "error" });
      console.error(ex);
    }
  }
  async ngOnDestroy() {
    
  }
}
