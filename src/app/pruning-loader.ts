import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

export class PruningTranslationLoader implements TranslateLoader {

  constructor(
    private http: HttpClient,
    private prefix: string = '/assets/i18n/',
    private suffix: string = '.json') {
  }

  public getTranslation(lang: string): any {
    return this.http.get(`${this.prefix}${lang}${this.suffix}`)
    .pipe(map(
      (result: object) => this.process(result)
    ));
  }

  private process(object: any):Object {
    return Object.keys(object)
      .filter(key => object.hasOwnProperty(key) && object[key] !== '')
      .reduce((result:any, key) => (result[key] = typeof object[key] === 'object' ? this.process(object[key]) : object[key], result), {});
  }

}