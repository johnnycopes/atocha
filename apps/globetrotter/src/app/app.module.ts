import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ErrorComponent, LoaderComponent } from '@atocha/globetrotter/ui';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    ErrorComponent,
    HttpClientModule,
    LoaderComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
