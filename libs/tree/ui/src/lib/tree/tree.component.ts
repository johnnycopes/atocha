import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';

import { trackByFactory } from '@atocha/core/ui';
import { GetChildren, GetId, Node } from '@atocha/tree/util';

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
  @Input() tree!: Node<T>;
  @Input() getId: GetId<T> = () => '';
  @Input() getChildren: GetChildren<T> = () => [];

  /**
   * The template of the node to pass into the tree.
   */
  @Input() template?: TemplateRef<TreeNodeContext<T>> | undefined;

  /**
   * **Do not modify**. Used internally to track number of levels of recursion and exposed via the template context.
   */
  @HostBinding('attr.data-level')
  @Input()
  level = 0;

  trackByFn = trackByFactory(this.getId);

  ngOnInit(): void {
    if (!this.tree) {
      throw new Error('A node must be passed into the TreeComponent');
    }
  }
}
