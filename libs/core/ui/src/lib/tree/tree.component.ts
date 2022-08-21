import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';

import { trackByFactory } from '../performance/track-by';

interface TreeNodeContext<T> {
  $implicit: T;
  level: number;
}

@Component({
  standalone: true,
  selector: 'core-tree',
  imports: [CommonModule],
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'core-tree',
  },
})
export class TreeComponent<T> implements OnInit {
  /**
   * The item to render in the tree.
   */
  @Input() node!: T;
  /**
   * The template of the node to pass into the tree.
   */
  @Input() template?: TemplateRef<TreeNodeContext<T>> | undefined = undefined;
  /**
   * **Do not modify**. Used internally to track number of levels of recursion and exposed via the template context.
   */
  @Input() level = 0;
  /**
   * Callback function that tells the tree how to retrieve the given node's unique ID.
   */
  @Input() getId: (node: T) => string = () => '';
  /**
   * Callback function that tells the tree how to retrieve the given node's children to recurse over, if it has any.
   */
  @Input() getChildren: (node: T) => T[] = () => [];

  // eslint-disable-next-line @typescript-eslint/member-ordering
  trackByFn = trackByFactory(this.getId);

  ngOnInit(): void {
    if (!this.node) {
      throw new Error('A node must be passed into the TreeComponent');
    }
  }
}
