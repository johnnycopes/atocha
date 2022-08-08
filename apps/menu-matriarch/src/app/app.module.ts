import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { CoreUiModule } from '@atocha/core/ui';
import { MenuMatriarchFeatureDishesModule } from '@atocha/menu-matriarch/feature-dishes';
import { MenuMatriarchFeatureMealsModule } from '@atocha/menu-matriarch/feature-meals';
import { MenuMatriarchFeatureMenusModule } from '@atocha/menu-matriarch/feature-menus';
import { MenuMatriarchFeaturePlannerModule } from '@atocha/menu-matriarch/feature-planner';
import { MenuMatriarchFeatureSettingsModule } from '@atocha/menu-matriarch/feature-settings';
import { MenuMatriarchFeatureTagsModule } from '@atocha/menu-matriarch/feature-tags';
import { MenuMatriarchUiModule } from '@atocha/menu-matriarch/ui';

import { AppComponent } from './app.component';
import { ErrorComponent } from './core/components/error/error.component';
import { HeaderComponent } from './core/components/header/header.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { ShellComponent } from './core/components/shell/shell.component';
import { WelcomeComponent } from './features/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HeaderComponent,
    PageNotFoundComponent,
    ShellComponent,
    WelcomeComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    BrowserModule,
    DragDropModule,
    FontAwesomeModule,
    FormsModule,
    OverlayModule,
    PortalModule,
    AppRoutingModule,
    CoreUiModule,
    MenuMatriarchFeatureDishesModule,
    MenuMatriarchFeatureMealsModule,
    MenuMatriarchFeatureMenusModule,
    MenuMatriarchFeaturePlannerModule,
    MenuMatriarchFeatureSettingsModule,
    MenuMatriarchFeatureTagsModule,
    MenuMatriarchUiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
