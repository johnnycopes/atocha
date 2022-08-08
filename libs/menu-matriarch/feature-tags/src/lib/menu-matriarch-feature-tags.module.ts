import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenuMatriarchUiModule } from '@atocha/menu-matriarch/ui';
import { TagCardComponent } from './tag-card/tag-card.component';
import { TagsComponent } from './tags/tags.component';

@NgModule({
  declarations: [
    TagCardComponent,
    TagsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: TagsComponent }]),
    MenuMatriarchUiModule,
  ],
})
export class MenuMatriarchFeatureTagsModule {}
