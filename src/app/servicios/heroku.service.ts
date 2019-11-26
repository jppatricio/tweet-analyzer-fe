import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HerokuService {

  BASEURL = "https://analisisapp.herokuapp.com/"

  train = "train/"
  getLabel = "getLabel/"

  constructor(private httpClient: HttpClient) { }

  postTrain(data): Observable<any>{
    console.log("Training...");
    var headers1 = new HttpHeaders();
    headers1.append('Content-Type', 'application/json');
    headers1.append('Access-Control-Allow-Origin', '*')
    const httpOptions = {
      headers: headers1,
      withCredentials: true,
    };
    
  
    return this.httpClient.post(this.BASEURL + this.train, data, { headers: headers1 }).pipe(
      map((res: HttpResponse<any>) => {

        return res;
      })
    )
    }

    postLabel(data): Observable<any>{
      console.log("Labeling...");
      var headers1 = new HttpHeaders();
      headers1.append('Content-Type', 'application/json');
      headers1.append('Access-Control-Allow-Origin', '*')
      const httpOptions = {
        headers: headers1,
        withCredentials: true,
      };
    
      return this.httpClient.post(this.BASEURL + this.getLabel, data, { headers: headers1 }).pipe(
        map((res: HttpResponse<any>) => {
          return res;
        })
      )
      }
}
