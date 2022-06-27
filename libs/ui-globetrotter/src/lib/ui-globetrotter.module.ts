import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiCoreModule, AutofocusDirective, MeasurementPipe } from '@atocha/ui-core';

import { AlertComponent } from './alert/alert.component';
import { ButtonComponent } from './button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ContainerComponent } from './container/container.component';
import { FixedSlideablePanelComponent } from './fixed-slideable-panel/fixed-slideable-panel.component';
import { FlipCardComponent } from './flip-card/flip-card.component';
import { IconComponent } from './icon/icon.component';
import { InputComponent } from './input/input.component';
import { ListDetailsComponent } from './list-details/list-details.component';
import { LoaderComponent } from './loader/loader.component';
import { NestedCheckboxesComponent } from './nested-checkboxes/nested-checkboxes.component';
import { NestedCheckboxesWithCountsComponent } from './nested-checkboxes-with-counts/nested-checkboxes-with-counts.component';
import { RadioButtonsComponent } from './radio-buttons/radio-buttons.component';
import { SmallCapsComponent } from './small-caps/small-caps.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UiCoreModule
  ],
  declarations: [
    AlertComponent,
    ButtonComponent,
    CheckboxComponent,
    ContainerComponent,
    FixedSlideablePanelComponent,
    FlipCardComponent,
    IconComponent,
    InputComponent,
    ListDetailsComponent,
    LoaderComponent,
    NestedCheckboxesComponent,
    NestedCheckboxesWithCountsComponent,
    RadioButtonsComponent,
    SmallCapsComponent,
  ],
  exports: [
    AlertComponent,
    AutofocusDirective,
    ButtonComponent,
    CheckboxComponent,
    ContainerComponent,
    FixedSlideablePanelComponent,
    FlipCardComponent,
    IconComponent,
    InputComponent,
    ListDetailsComponent,
    LoaderComponent,
    MeasurementPipe,
    NestedCheckboxesComponent,
    NestedCheckboxesWithCountsComponent,
    RadioButtonsComponent,
    SmallCapsComponent,
  ],
})
export class UiGlobetrotterModule {}
