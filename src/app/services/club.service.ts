import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '../interfaces/http-response';
import { environment } from "src/enviroments/enviroment.local";
import { PaginationClub } from "../interfaces/club";
import { Observable, map } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
    providedIn: 'root',
  })
  export class ClubsService {
    private baseUrl: string = environment.baseUrl + '/club';
    constructor(private http: HttpClient,
      private sanitizer: DomSanitizer,) {}

    CreateClub(data: any) {
        return new Promise<HttpResponse<null>>((resolve, reject) => {
          this.http.post<HttpResponse<null>>(this.baseUrl, data).subscribe(
            (resp) => {
              resolve(resp);
            },
            (error) => {
              reject(error);
            },
          );
        });
      }

      GetClubs(
        name?: any | null,
        idTournament?: any | null,
        Pagination?: any,
      ): Observable<HttpResponse<PaginationClub>> {
        let url = `${this.baseUrl}/filters?`;
        if (name) {
          url = url + `Name=${name}`;
        }
        if (idTournament) {
          url = url + `IdTournament=${idTournament}`;
        }
        url = url + `&Pagination.IsPaginated=true&Pagination.Page=${Pagination.Page}&Pagination.AmountRegistersPage=${Pagination.AmountRegistersPage}`;
        return this.http.get<HttpResponse<PaginationClub>>(url);
      }

      getImage(clubId: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/image/${clubId}`, { responseType: 'blob' }).pipe(
          map(response => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(response)))
        );
      }

  }

