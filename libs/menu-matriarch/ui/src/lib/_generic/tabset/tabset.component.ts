import { CommonModule } from '@angular/common';
import {
  Component,
  AfterContentInit,
  ContentChildren,
  QueryList,
  Input,
  TemplateRef,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { trackByFactory } from '@atocha/core/ui';
import { AnimatedComponent } from '@atocha/core/ui';
import { fadeInAnimation, visibilityAnimation } from '../../animations';
import { TabComponent } from './tab/tab.component';

export type TabsetContentVisibility = 'visible' | 'invisible';

@Component({
  standalone: true,
  selector: 'ui-tabset',
  imports: [CommonModule],
  templateUrl: './tabset.component.html',
  styleUrls: ['./tabset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation, visibilityAnimation],
})
export class TabsetComponent
  extends AnimatedComponent
  implements AfterContentInit, OnDestroy
{
  @Input() controlsTemplate: TemplateRef<unknown> | undefined;
  @Input() contentVisibility: TabsetContentVisibility = 'visible';
  @ContentChildren(TabComponent)
  tabs: QueryList<TabComponent> | undefined;
  trackByFn = trackByFactory<TabComponent>(({ name }) => name);
  private _destroy$ = new Subject<void>();

  @ViewChild('tabsElement')
  tabsElement: ElementRef | undefined;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngAfterContentInit(): void {
    const selectedTab = this.tabs?.find(({ selected }) => selected);

    if (!selectedTab && this.tabs?.first) {
      this.tabs.first.selected = true;
    }

    if (this.tabs) {
      merge(
        ...this.tabs.map(({ nameChange }) => nameChange),
        ...this.tabs.map(({ selectedChange }) => selectedChange)
      )
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => this._changeDetectorRef.markForCheck());
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onSelectTab(tab: TabComponent): void {
    this.tabs?.forEach((tab) => (tab.selected = false));
    tab.selected = true;
  }
}
