import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowseComponent } from '@atocha/lorenzo/feature-browse';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowseComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
