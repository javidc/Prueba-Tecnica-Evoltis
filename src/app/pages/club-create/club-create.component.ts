import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tournament } from 'src/app/interfaces/tournament';
import { ClubsService } from 'src/app/services/club.service';
import { TournamentsService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-club-create',
  templateUrl: './club-create.component.html',
  styleUrls: ['./club-create.component.scss']
})
export class ClubCreateComponent implements OnInit {
  public clubCreate!: FormGroup;
  public tournaments: Tournament[] = [];
  public imageClub: any;
  public imageFile!: { link: string; file: any; name: string };
  public selectedTournamentId: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private tournamentService: TournamentsService,
    private clubService: ClubsService,
    private toastR: ToastrService) { }

  ngOnInit(): void {
    this.clubCreate = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      image: [''],
      stadiumName: ['', Validators.required],
      idTournament: [''],
      cuit: ['', Validators.required],
    });

    console.log(this.clubCreate);

    this.getTournaments();
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
      formData.append('idTournament',this.selectedTournamentId.idTournament
      );
    }
    if (this.imageFile) {
      formData.append('imageLogo', this.imageFile.file);
    }
  
    this.clubService.CreateClub(formData).then(
      (resp: any) => {
        if (resp.code === 200) {
          console.log("entre");
          
          this.toastR.success(
            `Club`,
            'creado exitosamente',
            {
              timeOut: 5000,
              closeButton: true,
            }
          );
          this.clubCreate.reset();
          this.router.navigateByUrl('', {
            skipLocationChange: false,
          });
        }
      }
    );

  }

  onFileSelected(event: any) {
    const fileInput = event.target;
    const file = fileInput.files?.[0];

    if (file) {
      // Utiliza FileReader para leer la imagen como una URL de datos
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

  getTournaments()
  {
    this.tournamentService.GetTournaments().subscribe((resp) => {
      this.tournaments = resp.response;
    });
  }
}
