import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SearchInputComponent } from '@atocha/core/ui';
import { LeaderComponent } from '@atocha/lorenzo/ui';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, LeaderComponent, SearchInputComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
