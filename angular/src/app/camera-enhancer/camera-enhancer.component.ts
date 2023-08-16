import { Component } from '@angular/core';
import { CameraEnhancer, CameraView } from '@scannerproxy/dynamsoft-camera-enhancer';

@Component({
  selector: 'app-camera-enhancer',
  templateUrl: './camera-enhancer.component.html',
  styleUrls: ['./camera-enhancer.component.css']
})
export class CameraEnhancerComponent {
  async ngOnInit(): Promise<void> {
    try {
      CameraView.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-camera-enhancer/dist/";
      const cameraView = await CameraView.createInstance();
      await cameraView.setUIElement(
        (document.querySelector('.dce-video-container') as HTMLElement).parentElement as HTMLElement
      );
      const cameraEnhancer = await CameraEnhancer.createInstance(cameraView);
      await cameraEnhancer.open();
    } catch (ex: any) {
      let errMsg;
      if (ex.message.includes('network connection error')) {
        errMsg =
          'Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.';
      } else {
        errMsg = ex.message || ex;
      }
      console.error(errMsg);
      alert(errMsg);
    }
  }
  async ngOnDestroy() {
    
  }
}
