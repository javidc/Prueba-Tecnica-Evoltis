import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpResponse } from '../interfaces/http-response';
import { environment } from "src/enviroments/enviroment.local";
import { ClubUpdateData, PaginationClub } from "../interfaces/club";
import { Observable, map } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
  providedIn: 'root',
})
export class ClubsService {
  private baseUrl: string = environment.baseUrl + '/club';
  constructor(private http: HttpClient,
    private sanitizer: DomSanitizer,) { }

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

  UpdateClub(data: any) {
    return new Promise<HttpResponse<null>>((resolve, reject) => {
      this.http.patch<HttpResponse<null>>(this.baseUrl, data).subscribe(
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
    let params = new HttpParams();
    if (name) params = params.set('Name', name);
    if (idTournament) params = params.set('IdTournament', idTournament);
    params = params.set('Pagination.IsPaginated', true);
    if (Pagination.Page) params = params.set('Pagination.Page', Pagination.Page);
    if (Pagination.AmountRegistersPage)
      params = params.set(
        'Pagination.AmountRegistersPage',
        Pagination.AmountRegistersPage,
      );
    const options = { params: params };

    return this.http.get<HttpResponse<PaginationClub>>(url, options);
  }

  getImage(clubId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/image/${clubId}`, { responseType: 'blob' }).pipe(
      map(response => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(response)))
    );
  }

  GetClubById(idClub: number): Observable<HttpResponse<ClubUpdateData>> {
    const url = this.baseUrl + `/${idClub}`
    return this.http.get<HttpResponse<ClubUpdateData>>(url);
  }

}

