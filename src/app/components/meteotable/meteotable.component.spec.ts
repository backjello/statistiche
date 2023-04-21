import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteotableComponent } from './meteotable.component';

describe('MeteotableComponent', () => {
  let component: MeteotableComponent;
  let fixture: ComponentFixture<MeteotableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeteotableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeteotableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
