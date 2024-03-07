import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '../interfaces/http-response';
import { environment } from "src/enviroments/enviroment.local";
import { Observable, map } from "rxjs";
import { Tournament } from "../interfaces/tournament";

@Injectable({
    providedIn: 'root',
  })
  export class TournamentsService {
    private baseUrl: string = environment.baseUrl + '/tournament';
    constructor(private http: HttpClient,) {}


    GetTournaments(): Observable<HttpResponse<Tournament[]>> {
        return this.http.get<HttpResponse<Tournament[]>>(this.baseUrl);
      }

  }