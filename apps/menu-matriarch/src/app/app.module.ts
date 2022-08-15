import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { MenuMatriarchFeatureDishesModule } from '@atocha/menu-matriarch/feature-dishes';
import { MenuMatriarchFeatureMealsModule } from '@atocha/menu-matriarch/feature-meals';
import { MenuMatriarchFeatureMenusModule } from '@atocha/menu-matriarch/feature-menus';
import { MenuMatriarchFeaturePlannerModule } from '@atocha/menu-matriarch/feature-planner';
import { MenuMatriarchFeatureSettingsModule } from '@atocha/menu-matriarch/feature-settings';
import { MenuMatriarchFeatureShellModule } from '@atocha/menu-matriarch/feature-shell';
import { MenuMatriarchFeatureTagsModule } from '@atocha/menu-matriarch/feature-tags';
import { MenuMatriarchUiModule } from '@atocha/menu-matriarch/ui';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MenuMatriarchFeatureDishesModule,
    MenuMatriarchFeatureMealsModule,
    MenuMatriarchFeatureMenusModule,
    MenuMatriarchFeaturePlannerModule,
    MenuMatriarchFeatureSettingsModule,
    MenuMatriarchFeatureShellModule,
    MenuMatriarchFeatureTagsModule,
    MenuMatriarchUiModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
