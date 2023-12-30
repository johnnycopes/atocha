import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  OnChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import { trackByFactory, trackBySelf } from '@atocha/core/ui';
import { pluralize } from '@atocha/core/util';
import {
  FlagComponent,
  SmallCapsComponent,
} from '@atocha/globetrotter/shared/ui';
import { Country } from '@atocha/globetrotter/shared/util';
import { MeasurementPipe } from './measurement.pipe';

interface TableData {
  header: string;
  content?: string;
  template?: TemplateRef<unknown>;
}

@Component({
  standalone: true,
  selector: 'app-explore-country',
  imports: [CommonModule, FlagComponent, MeasurementPipe, SmallCapsComponent],
  templateUrl: './explore-country.component.html',
  styleUrls: ['./explore-country.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExploreCountryComponent implements OnChanges, AfterViewInit {
  @Input({ required: true }) country!: Country;
  @Input({ required: true }) summary = '';
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

  ngOnChanges(): void {
    this._setTableData();
  }

  ngAfterViewInit(): void {
    this._setTableData();
    this._changeDetectorRef.markForCheck();
  }

  private _setTableData(): void {
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
        header: pluralize(languages.length, 'language'),
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
