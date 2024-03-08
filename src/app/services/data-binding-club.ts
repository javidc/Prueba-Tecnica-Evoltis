import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataBindingClubService {
  private idClub = new BehaviorSubject<number>(0);

  constructor() {}

  saveClubID(id: number): void {
    this.idClub.next(id);
  }

  getsaveClubID(): Observable<number> {
    return this.idClub;
  }
}