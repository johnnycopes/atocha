import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreUiModule } from '@atocha/core/ui';
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
    DragDropModule,
    FontAwesomeModule,
    FormsModule,
    AppRoutingModule,
    CoreUiModule,
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
