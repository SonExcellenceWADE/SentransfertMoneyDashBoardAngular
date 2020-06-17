import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatFormFieldModule, 
  MatInputModule, 
  MatCheckboxModule, 
  MatSelectModule, 
  MatCardModule, 
  MatRadioModule, 
  MatSlideToggleModule, 
  MatTabsModule, 
  MatTableModule, 
  MatPaginatorModule, 
  MatSortModule, 
  MatIconModule, 
  MatDialogModule, 
  MatDatepickerModule, 
  MatNativeDateModule, 
  MatDialogRef, 
  MAT_DIALOG_DATA, 
  MatStepperModule, 
  MatSliderModule 
} from '@angular/material';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { TitleComponent } from './layouts/admin/title/title.component';
import { BreadcrumbsComponent } from './layouts/admin/breadcrumbs/breadcrumbs.component';
import { AuthComponent } from './layouts/auth/auth.component';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormConnexionComponent } from './components/form-connexion/form-connexion.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { JwtInterceptorService } from './helpers/jwt-interceptor.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';






@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    TitleComponent,
    BreadcrumbsComponent,
    AuthComponent,
    FormConnexionComponent,
    ConnexionComponent,
  

    
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
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
    MatSliderModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCwA1WF41wXwpp9H9N0NOvpPnP4OgcycZU',
      libraries: ['places']
    }),

    

  ],
  providers: [
    DatePipe,
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true, },
  { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } },
  { provide: MatDialogRef, useValue: {} },
  { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
