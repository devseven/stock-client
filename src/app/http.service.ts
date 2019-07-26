import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private api = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  get(collection) {
    console.log(collection);
    return this.http.get(this.api + collection);
  }

  post(collection, data) {
  	return this.http.post(this.api + collection, data);
  }

}
