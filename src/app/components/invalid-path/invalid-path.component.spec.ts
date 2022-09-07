import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidPathComponent } from './invalid-path.component';

describe('InvalidPathComponent', () => {
  let component: InvalidPathComponent;
  let fixture: ComponentFixture<InvalidPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidPathComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvalidPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
