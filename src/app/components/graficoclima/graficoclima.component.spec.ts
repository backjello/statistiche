import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoclimaComponent } from './graficoclima.component';

describe('GraficoclimaComponent', () => {
  let component: GraficoclimaComponent;
  let fixture: ComponentFixture<GraficoclimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoclimaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoclimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
