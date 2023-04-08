import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TagCardComponent } from './tag-card/tag-card.component';
import { TagsComponent } from './tags.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: TagsComponent }]),
    TagCardComponent,
    TagsComponent,
  ],
})
export class MenuMatriarchFeatureTagsModule {}
