import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  AfterViewInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  ChangeDetectorRef,
  SimpleChanges,
} from '@angular/core';

import { trackByFactory, trackBySelf } from '@atocha/core/ui';
import { pluralize } from '@atocha/core/util';
import { MeasurementPipe, SmallCapsComponent } from '@atocha/globetrotter/ui';
import { Country } from '@atocha/globetrotter/util';

interface TableData {
  header: string;
  content?: string;
  template?: TemplateRef<unknown>;
}

@Component({
  standalone: true,
  selector: 'app-explore-country',
  imports: [CommonModule, MeasurementPipe, SmallCapsComponent],
  templateUrl: './explore-country.component.html',
  styleUrls: ['./explore-country.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExploreCountryComponent implements OnChanges, AfterViewInit {
  @Input() country: Country | undefined;
  @Input() summary = '';
  @ViewChild('population') populationTemplate: TemplateRef<unknown> | undefined;
  @ViewChild('size') sizeTemplate: TemplateRef<unknown> | undefined;
  @ViewChild('language') languageTemplate: TemplateRef<unknown> | undefined;
  @ViewChild('currency') currencyTemplate: TemplateRef<unknown> | undefined;
  @ViewChild('callingCodes') callingCodesTemplate:
    | TemplateRef<unknown>
    | undefined;
  @ViewChild('list') listTemplate: TemplateRef<unknown> | undefined;
  tableData: TableData[] = [];
  readonly tableDataTrackByFn = trackByFactory<TableData>(
    ({ header }) => header
  );
  readonly itemTrackByFn = trackBySelf;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this._setTableData();
    }
  }

  ngAfterViewInit(): void {
    this._setTableData();
    this._changeDetectorRef.markForCheck();
  }

  private _setTableData(): void {
    if (!this.country) {
      return;
    }
    const {
      subregion,
      demonym,
      languages,
      currencies,
      callingCodes,
      topLevelDomain,
    } = this.country;
    this.tableData = [
      {
        header: 'subregion',
        content: subregion,
      },
      {
        header: 'demonym',
        content: demonym,
      },
      {
        header: pluralize(languages.length, 'languages'),
        template: this.languageTemplate,
      },
      {
        header: pluralize(currencies.length, 'currency', 'currencies'),
        template: this.currencyTemplate,
      },
      {
        header: 'population',
        template: this.populationTemplate,
      },
      {
        header: 'size',
        template: this.sizeTemplate,
      },
      {
        header: `calling ${pluralize(callingCodes.length, 'code')}`,
        template: this.callingCodesTemplate,
      },
      {
        header: 'top-level domain',
        content: topLevelDomain[0],
      },
    ];
  }
}
