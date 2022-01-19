import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraEnhancerComponent } from './camera-enhancer.component';

describe('CameraEnhancerComponent', () => {
  let component: CameraEnhancerComponent;
  let fixture: ComponentFixture<CameraEnhancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraEnhancerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraEnhancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
