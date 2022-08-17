import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';

import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private _totalRequests = 0;

  constructor(private _loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    // TODO: strengthen this
    if (request.url.includes('restcountries')) {
      this._totalRequests++;
      this._loaderService.setGlobalLoader(true);
    }

    return next.handle(request).pipe(
      finalize(() => {
        this._totalRequests--;
        if (this._totalRequests === 0) {
          this._loaderService.setGlobalLoader(false);
        }
      })
    );
  }
}
