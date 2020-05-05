import { MatFormFieldModule, MatInputModule, MAT_DIALOG_DATA, MatDialogRef, MatCheckboxModule, MatRadioModule, MatSliderModule, MatSelectModule, MatCardModule, MatSlideToggleModule, MatTabsModule, MatPaginatorModule, MatSortModule, MatTableModule, MatDialogModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatStepperModule } from '@angular/material';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ListTransactionRoutingModule } from './list-transaction-routing.module';
import { JwtInterceptorService } from '../../../helpers/jwt-interceptor.service';
import { ListTransactionComponent } from './list-transaction.component';



@NgModule({
  imports: [
    CommonModule,
    ListTransactionRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatCardModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatIconModule,
    MatSliderModule
    
  ],
  declarations: [ListTransactionComponent],
  providers: [
    DatePipe,
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true, },
  { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } },
  { provide: MatDialogRef, useValue: {} },
  { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
})
export class ListTransactionModule { }
