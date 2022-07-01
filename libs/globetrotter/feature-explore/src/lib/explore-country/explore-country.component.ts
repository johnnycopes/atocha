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

import { Country } from '@atocha/globetrotter/types';

interface ITableContent {
  header: string;
  content?: string;
  template?: TemplateRef<unknown>;
}

@Component({
  selector: 'app-explore-country',
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
  @ViewChild('list') listTemplate: TemplateRef<unknown> | undefined;
  tableData: ITableContent[] = [];

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
      numericCode,
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
        header: `language${languages.length > 1 ? 's' : ''}`,
        template: this.languageTemplate,
      },
      {
        header: `currenc${currencies.length > 1 ? 'ies' : 'y'}`,
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
        header: 'numeric code',
        content: `+${numericCode}`,
      },
      {
        header: 'top-level domain',
        content: topLevelDomain[0],
      },
    ];
  }
}
