import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MumbaiAdLandingComponent } from './mumbai-ad-landing.component';

describe('MumbaiAdLandingComponent', () => {
  let component: MumbaiAdLandingComponent;
  let fixture: ComponentFixture<MumbaiAdLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MumbaiAdLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MumbaiAdLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
