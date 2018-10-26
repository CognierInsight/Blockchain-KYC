import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth-interceptor';
import { KycComponent } from './kyc/kyc.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    KycComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
  	AuthService,
  	{ 
    	provide: HTTP_INTERCEPTORS, 
    	useClass: AuthInterceptor, 
    	multi: true 
	} 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
