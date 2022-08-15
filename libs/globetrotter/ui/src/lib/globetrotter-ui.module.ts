import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AutofocusDirective,
  MeasurementPipe,
  NestedCheckboxesWithCountsComponent,
} from '@atocha/core/ui';

import { AlertComponent } from './alert/alert.component';
import { ButtonComponent } from './button/button.component';
import { ContainerComponent } from './container/container.component';
import { FixedSlideablePanelComponent } from './fixed-slideable-panel/fixed-slideable-panel.component';
import { FlipCardComponent } from './flip-card/flip-card.component';
import { IconComponent } from './icon/icon.component';
import { InputComponent } from './input/input.component';
import { ListDetailsComponent } from './list-details/list-details.component';
import { LoaderComponent } from './loader/loader.component';
import { RadioButtonsComponent } from './radio-buttons/radio-buttons.component';
import { SmallCapsComponent } from './small-caps/small-caps.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AutofocusDirective,
    MeasurementPipe,
    NestedCheckboxesWithCountsComponent,
  ],
  declarations: [
    AlertComponent,
    ButtonComponent,
    ContainerComponent,
    FixedSlideablePanelComponent,
    FlipCardComponent,
    IconComponent,
    InputComponent,
    ListDetailsComponent,
    LoaderComponent,
    RadioButtonsComponent,
    SmallCapsComponent,
  ],
  exports: [
    AlertComponent,
    AutofocusDirective,
    ButtonComponent,
    ContainerComponent,
    FixedSlideablePanelComponent,
    FlipCardComponent,
    IconComponent,
    InputComponent,
    ListDetailsComponent,
    LoaderComponent,
    MeasurementPipe,
    NestedCheckboxesWithCountsComponent,
    RadioButtonsComponent,
    SmallCapsComponent,
  ],
})
export class GlobetrotterUiModule {}
