import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  CameraEnhancer,
  CameraView,
} from '@dynamsoft/dynamsoft-camera-enhancer';

@Component({
  selector: 'app-camera-enhancer',
  templateUrl: './camera-enhancer.component.html',
  styleUrls: ['./camera-enhancer.component.css'],
})
export class CameraEnhancerComponent {
  cameraView: CameraView | null = null;
  cameraEnhancer: CameraEnhancer | null = null;
  pInstance: Promise<CameraView | CameraEnhancer> | null = null;
  
  @ViewChild('container') container: ElementRef<HTMLDivElement> | null = null;

  async ngAfterViewInit() {
    try {
      this.cameraView = await (this.pInstance = CameraView.createInstance(
        this.container!.nativeElement
      ));
      this.cameraEnhancer = await (this.pInstance = CameraEnhancer.createInstance(
        this.cameraView
      ));
      await this.cameraEnhancer.open();
      this.pInstance = null;
    } catch (ex: any) {
      alert(ex.message || ex);
      throw ex;
    }
  }

  async ngOnDestroy() {
    if (this.cameraView && !this.cameraView.disposed) this.cameraView.dispose();
    if (this.cameraEnhancer && !this.cameraEnhancer.disposed)
      this.cameraEnhancer.dispose();
    if (this.pInstance) {
      const instance = await this.pInstance;
      if (!instance.disposed) instance.dispose();
    }
  }
}
