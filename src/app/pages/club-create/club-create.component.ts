import { Component, OnInit, Sanitizer } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClubData, ClubUpdateData } from 'src/app/interfaces/club';
import { Tournament } from 'src/app/interfaces/tournament';
import { ClubsService } from 'src/app/services/club.service';
import { DataBindingClubService } from 'src/app/services/data-binding-club';
import { TournamentsService } from 'src/app/services/tournament.service';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-club-create',
  templateUrl: './club-create.component.html',
  styleUrls: ['./club-create.component.scss'],
  providers: [ToastrService]
})
export class ClubCreateComponent implements OnInit, OnDestroy {
  public clubCreate!: FormGroup;
  public tournaments: Tournament[] = [];
  public imageClub: any;
  public imageFile!: { link: string; file: any; name: string };
  public selectedTournamentId: any;
  public idClub!: number;
  public club!: ClubUpdateData;
  public urlView?: string;
  private subscription: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private tournamentService: TournamentsService,
    private clubService: ClubsService,
    private toastR: ToastrService,
    private dataBindingClubService: DataBindingClubService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.clubCreate = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      image: [''],
      stadiumName: ['', Validators.required],
      idTournament: [''],
      cuit: ['', Validators.required],
    });

    this.getTournaments();

    if (this.router.url.includes('update')) {
      this.urlView = "update";
      this.subscription.add(
        this.dataBindingClubService.getsaveClubID().subscribe((idClub) => {
          this.idClub = idClub;
          this.getInfoClub(idClub);
        })
      );
    }
  }

  cancelate() {
    this.router.navigateByUrl(``, {
      skipLocationChange: false,
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.clubCreate.controls['name'].value);
    formData.append('cuit', this.clubCreate.controls['cuit'].value);
    formData.append('address', this.clubCreate.controls['address'].value);
    formData.append('stadiumName', this.clubCreate.controls['stadiumName'].value);
    if (this.clubCreate.controls['idTournament'].value) {
      formData.append('idTournament', this.selectedTournamentId.idTournament);
    }
    if (this.imageFile) {
      formData.append('imageLogo', this.imageFile.file);
    }
  
    this.clubService.CreateClub(formData)
      .then((resp: any) => {
        if (resp.code === 200) {
          this.toastR.success(
            `club creado exitosamente`,
            'Nuevo club',
            {
              timeOut: 5000,
              closeButton: true,
            },
          );
          this.clubCreate.reset();
          this.router.navigateByUrl('', {
            skipLocationChange: false,
          });
        } else {
          this.toastR.error(
            'Los datos no son correctos. Intente nuevamente.',
            'Error al crear el club',
            {
              timeOut: 5000,
              closeButton: true,
            },
          );
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
        this.toastR.error(
          'Los datos no son correctos. Intente nuevamente.',
          'Error al crear el club',
          {
            timeOut: 5000,
            closeButton: true,
          },
        );
      });
  }

  edit() {
    const formData = new FormData();
    formData.append('idClub', this.idClub.toString());
    formData.append('name', this.clubCreate.controls['name'].value);
    formData.append('cuit', this.clubCreate.controls['cuit'].value);
    formData.append('address', this.clubCreate.controls['address'].value);
    formData.append('stadiumName', this.clubCreate.controls['stadiumName'].value);
    if (this.clubCreate.controls['idTournament'].value) {
      formData.append('idTournament', this.selectedTournamentId.idTournament);
    }
    if (this.imageFile) {
      formData.append('imageLogo', this.imageFile.file);
    }
    formData.append('active', this.club.active.toString());
  
    this.clubService.UpdateClub(formData).then(
      (resp: any) => {
        if (resp.code === 200) {
          this.toastR.success(
            `Club modificado exitosamente`,
            'Club actualizado',
            {
              timeOut: 5000,
              closeButton: true,
            }
          );
          this.router.navigateByUrl('', {
            skipLocationChange: false,
          });
        } else {
          this.toastR.error(
            'Error al modificar el club',
            `Código de error: ${resp.code}`,
            {
              timeOut: 5000,
              closeButton: true,
            }
          );
        }
      }
    ).catch((error) => {
      console.error('Error en la solicitud:', error);
      this.toastR.error(
        'Los datos no son correctos. Intente nuevamente',
        'Error al modificar el club',
        {
          timeOut: 5000,
          closeButton: true,
        }
      );
    });
  }
  

  onFileSelected(event: any) {
    const fileInput = event.target;
    const file = fileInput.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (_event: any) => {
        this.imageClub = _event.target?.result;
        this.imageFile = {
          link: _event.target.result,
          file: event.srcElement.files[0],
          name: event.srcElement.files[0].name,
        };
      };
      reader.readAsDataURL(file);
    }
  }

  getTournaments() {
    this.tournamentService.GetTournaments().subscribe((resp) => {
      this.tournaments = resp.response;
    });
  }

  getImage(club: ClubData | ClubUpdateData) {
    this.clubService.getImage(club.idClub).subscribe(
      (image) => {
        club.image = image;
        if(this.urlView === 'update')
        {
          this.imageClub = this.club.image;
        }
      },
      (error) => {

      }
    );
  }

  getInfoClub(idClub: number) {
    this.clubService.GetClubById(idClub).subscribe((resp) => {
      this.club = resp.response;
      
      this.clubCreate.patchValue({
        name: this.club.name,
        address: this.club.address,
        stadiumName: this.club.stadiumName,
        cuit: this.club.cuit,
        idTournament: this.club.idTournament,
      });
      this.selectedTournamentId = this.tournaments.filter(tournament => tournament.idTournament == this.club.idTournament)[0]
      this.getImage(this.club);

      
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
