import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComptepartenaireComponent } from './list-comptepartenaire.component';

describe('ListComptepartenaireComponent', () => {
  let component: ListComptepartenaireComponent;
  let fixture: ComponentFixture<ListComptepartenaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComptepartenaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComptepartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
