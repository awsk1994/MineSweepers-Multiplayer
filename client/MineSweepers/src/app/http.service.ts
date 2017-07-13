import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";

@Injectable()
export class HttpService {

  constructor(private http: Http) { }

  public BASE_URL: string = "http://localhost:3000";

  post(localLink, body) {
    console.log("post");
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.BASE_URL + localLink, body, { headers: headers })
      .map((response: Response) => {
        const result = response.json();
        return result;
      });
  }

}
