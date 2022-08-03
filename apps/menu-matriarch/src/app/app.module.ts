import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { CoreUiModule } from '@atocha/core/ui';
import { MenuMatriarchUiModule } from '@atocha/menu-matriarch/ui';

import { AppComponent } from './app.component';
import { DishCardComponent } from './features/dishes/dish-card/dish-card.component';
import { DishDefDirective } from './features/dishes/dishes-list/dish-def.directive';
import { DishDetailsComponent } from './features/dishes/dish-details/dish-details.component';
import { DishEditComponent } from './features/dishes/dish-edit/dish-edit.component';
import { DishesComponent } from './features/dishes/dishes.component';
import { DishesListComponent } from './features/dishes/dishes-list/dishes-list.component';
import { DishPlaceholderComponent } from './features/dishes/dish-placeholder/dish-placeholder.component';
import { ErrorComponent } from './core/components/error/error.component';
import { HeaderComponent } from './core/components/header/header.component';
import { MealCardComponent } from './features/meals/meal-card/meal-card.component';
import { MealDefDirective } from './features/meals/meals-list/meal-def.directive';
import { MealDetailsComponent } from './features/meals/meal-details/meal-details.component';
import { MealEditComponent } from './features/meals/meal-edit/meal-edit.component';
import { MealPlaceholderComponent } from './features/meals/meal-placeholder/meal-placeholder.component';
import { MealsComponent } from './features/meals/meals.component';
import { MealsListComponent } from './features/meals/meals-list/meals-list.component';
import { MenuCardComponent } from './features/menus/menu-card/menu-card.component';
import { MenusComponent } from './features/menus/menus.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { PlannerComponent } from './features/planner/planner.component';
import { PlannerDayComponent } from './features/planner/planner-menu/planner-day/planner-day.component';
import { PlannerDishComponent } from './features/planner/planner-dishes/planner-dish/planner-dish.component';
import { PlannerDishesComponent } from './features/planner/planner-dishes/planner-dishes.component';
import { PlannerMealComponent } from './features/planner/planner-meals/planner-meal/planner-meal.component';
import { PlannerMealsComponent } from './features/planner/planner-meals/planner-meals.component';
import { PlannerMenuComponent } from './features/planner/planner-menu/planner-menu.component';
import { SettingsComponent } from './features/settings/settings.component';
import { ShellComponent } from './core/components/shell/shell.component';
import { TagCardComponent } from './features/tags/tag-card/tag-card.component';
import { TagsComponent } from './features/tags/tags.component';
import { WelcomeComponent } from './features/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    DishCardComponent,
    DishDefDirective,
    DishDetailsComponent,
    DishEditComponent,
    DishesComponent,
    DishesListComponent,
    DishPlaceholderComponent,
    ErrorComponent,
    HeaderComponent,
    MealCardComponent,
    MealDefDirective,
    MealDetailsComponent,
    MealEditComponent,
    MealPlaceholderComponent,
    MealsComponent,
    MealsListComponent,
    MenuCardComponent,
    MenusComponent,
    PageNotFoundComponent,
    PlannerComponent,
    PlannerDayComponent,
    PlannerDishComponent,
    PlannerDishesComponent,
    PlannerMealComponent,
    PlannerMealsComponent,
    PlannerMenuComponent,
    SettingsComponent,
    ShellComponent,
    TagCardComponent,
    TagsComponent,
    WelcomeComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    BrowserModule,
    DragDropModule,
    EditorModule,
    FontAwesomeModule,
    FormsModule,
    OverlayModule,
    PortalModule,
    AppRoutingModule,
    CoreUiModule,
    MenuMatriarchUiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
