import { removeWhitespace } from './remove-whitespace';

export class Csv {
  constructor(private _document: Document) {
    if (!_document) {
      throw new Error(
        'Document object must be passed to Csv class on initialization'
      );
    }
  }

  generateCsv(filename: string, rows: string[][]): void {
    const csvContent = rows.map((e) => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = this._document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      this._document.body.appendChild(link);
      link.click();
      this._document.body.removeChild(link);
    }
  }

  formatCsvStr(value: string | number): string {
    return `"${removeWhitespace(
      typeof value === 'string' ? value : value.toString()
    )}"`;
  }
}
