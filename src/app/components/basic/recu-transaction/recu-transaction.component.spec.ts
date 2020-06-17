import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuTransactionComponent } from './recu-transaction.component';

describe('RecuTransactionComponent', () => {
  let component: RecuTransactionComponent;
  let fixture: ComponentFixture<RecuTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
