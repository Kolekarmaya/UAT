import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http: HttpClient) { }

  getModules() {
    return this.http.get('API')
      .pipe(map(module_list => {
        return module_list;
      }));
  }
}
