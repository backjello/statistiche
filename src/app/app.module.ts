import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { MeteotableComponent } from './components/meteotable/meteotable.component'
import { MatTableModule} from '@angular/material/table'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MeteotableComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
