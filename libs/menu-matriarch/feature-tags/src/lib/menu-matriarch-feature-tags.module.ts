import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardComponent, CountComponent, InlineNameEditComponent, SectionComponent, TagComponent } from '@atocha/menu-matriarch/ui';
import { TagCardComponent } from './tag-card/tag-card.component';
import { TagsComponent } from './tags.component';

@NgModule({
  declarations: [TagCardComponent, TagsComponent],
  imports: [
    CardComponent,
    CommonModule,
    CountComponent,
    InlineNameEditComponent,
    RouterModule.forChild([{ path: '', component: TagsComponent }]),
    SectionComponent,
    TagComponent,
  ],
})
export class MenuMatriarchFeatureTagsModule {}
