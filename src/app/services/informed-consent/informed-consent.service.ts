import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { environment } from 'src/environments/environment';

const PATH_API = environment.API_URL;
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class InformedConsentService{
    constructor(private http: HttpClient) { }
    listInformedConsents(){
        return this.http.get(`${PATH_API}/informed-consents`, httpOptions).pipe(
            map((response: any)=> {
                return response
            })
        );
    }
}