import { Component, OnInit } from '@angular/core';
import { ClubsService } from '../../services/club.service';
import { ClubData } from 'src/app/interfaces/club';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/interfaces/paginations';
import { Tournament } from 'src/app/interfaces/tournament';
import { TournamentsService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-clubes-view',
  templateUrl: './clubes-view.component.html',
  styleUrls: ['./clubes-view.component.scss']
})
export class ClubesViewComponent implements OnInit {

  public clubs: ClubData[] = [];
  public tournaments: Tournament[] = [];
  public selectedTournamentId: any;
  public nameFilter?: string;
  public idTournamentFilter!: number;
  public itemsPerPage: number = 5;
  public actualPage: number = 1;
  public totalQuantity!: number;
  public numberOfPages!: number;
  public Pagination: Pagination = {
    IsPaginated: true,
    Page: this.actualPage,
    AmountRegistersPage: this.itemsPerPage,
  };

  constructor(
    private clubService: ClubsService,
    private router: Router,
    private tournamentService: TournamentsService
  ) { }

  ngOnInit(): void {
    this.getClubs();
    this.getTournaments();
  }

  getClubs() {
    if(this.selectedTournamentId)
    {
      let id = this.selectedTournamentId.idTournament;
      this.idTournamentFilter = id;
    }
    this.clubService.GetClubs(
      this.nameFilter ? this.nameFilter : null,
      this.idTournamentFilter ? this.idTournamentFilter : null,
      this.Pagination).subscribe((resp) => {
        if (!resp.response) {
          this.clubs = [];
        }
      this.clubs = resp.response.lstClubsGetDto;
      this.totalQuantity = resp.response.totalQuantity;
      this.numberOfPages = resp.response.numberOfPages;
        this.clubs.forEach((club) => {
          this.getImage(club);
        });
    });
  }

  getTournaments()
  {
    this.tournamentService.GetTournaments().subscribe((resp) => {
      this.tournaments = resp.response;
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

      // Cambios en la pagina a visualizar.
      changePage(event: any) {
        this.Pagination.Page = event.page + 1;
        this.Pagination.AmountRegistersPage = event.rows;
        this.getClubs();
      }
}
