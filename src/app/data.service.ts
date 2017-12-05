import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result;

  constructor(private _http: HttpClient) { }

  getUsers() {
    return this._http.get("http://localhost:3000/Hotel");

  }

}