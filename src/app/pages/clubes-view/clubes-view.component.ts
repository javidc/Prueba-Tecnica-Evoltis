import { Component, OnInit } from '@angular/core';
import { ClubsService } from '../../services/club.service';
import { ClubData } from 'src/app/interfaces/club';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clubes-view',
  templateUrl: './clubes-view.component.html',
  styleUrls: ['./clubes-view.component.scss']
})
export class ClubesViewComponent implements OnInit {

  public clubs: ClubData[] = [];

  constructor(
    private clubService: ClubsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getClubs();
  }

  getClubs() {
    this.clubService.GetClubs().subscribe((resp) => {
      this.clubs = resp.response.lstClubsGetDto;
      this.clubs.forEach((club) => {
        this.getImage(club);
      });
    });
  }

  getImage(club: ClubData) {
    this.clubService.getImage(club.idClub).subscribe(
      (image) => {
        club.image = image;
      },
      (error) => {

      }
    );
  }

  newClub() {
    this.router.navigateByUrl(`club/new`, {
      skipLocationChange: false,
    });
  }
}
