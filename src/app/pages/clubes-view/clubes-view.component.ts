import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClubsService } from '../../services/club.service';
import { ClubData } from 'src/app/interfaces/club';

@Component({
  selector: 'app-clubes-view',
  templateUrl: './clubes-view.component.html',
  styleUrls: ['./clubes-view.component.scss']
})
export class ClubesViewComponent implements OnInit {

  public clubs: ClubData[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private clubService: ClubsService,
    private toastR: ToastrService,
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
}
