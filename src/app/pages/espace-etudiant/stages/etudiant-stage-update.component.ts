import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IStage } from 'app/shared/model/stage.model';
import { ISoutenance } from 'app/shared/model/soutenance.model';
import { IEtudiant } from 'app/shared/model/etudiant.model';
import { ISuperviseur } from 'app/shared/model/superviseur.model';
import { IProfesseur } from 'app/shared/model/professeur.model';
import { ISociete } from 'app/shared/model/societe.model';
import {
  EtudiantService,
  ProfesseurService, SocieteService,
  SoutenanceService,
  StageService,
  SuperviseurService
} from "../../../services/entities";
import {ProfileService} from "../../../services/auth/profile.service";


@Component({
    selector: 'jhi-stage-update',
    templateUrl: './etudiant-stage-update.component.html'
})
export class EtudiantStageUpdateComponent implements OnInit {
    stage: IStage;
    isSaving: boolean;

    soutenances: ISoutenance[];

    etudiants: IEtudiant[];

    superviseurs: ISuperviseur[];

    professeurs: IProfesseur[];

    etudiant:IEtudiant;

    societes: ISociete[];
    dateDebutDp: any;
    dateFinDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected stageService: StageService,
        protected soutenanceService: SoutenanceService,
        protected profileService: ProfileService,
        protected superviseurService: SuperviseurService,
        protected professeurService: ProfesseurService,
        protected societeService: SocieteService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ stage }) => {
            this.stage = stage;
        });
        this.soutenanceService.query({ filter: 'stage-is-null' }).subscribe(
            (res: HttpResponse<ISoutenance[]>) => {
                if (!this.stage.soutenance || !this.stage.soutenance.id) {
                    this.soutenances = res.body;
                } else {
                    this.soutenanceService.find(this.stage.soutenance.id).subscribe(
                        (subRes: HttpResponse<ISoutenance>) => {
                            this.soutenances = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.profileService.getProfile().subscribe(
            (res:IEtudiant) => {
                this.etudiant = res;
            }
        );
        this.superviseurService.query().subscribe(
            (res: HttpResponse<ISuperviseur[]>) => {
                this.superviseurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.professeurService.query().subscribe(
            (res: HttpResponse<IProfesseur[]>) => {
                this.professeurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.societeService.query().subscribe(
            (res: HttpResponse<ISociete[]>) => {
                this.societes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.stage.id !== undefined) {
          this.stage.etudiant=this.etudiant
            this.subscribeToSaveResponse(this.stageService.update(this.stage));
        } else {
          this.stage.etudiant=this.etudiant
          this.subscribeToSaveResponse(this.stageService.create(this.stage));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IStage>>) {
        result.subscribe((res: HttpResponse<IStage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
      this.jhiAlertService.success("Ajout/Modification effectue correctement", null, null);
      this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackSoutenanceById(index: number, item: ISoutenance) {
        return item.id;
    }

    trackEtudiantById(index: number, item: IEtudiant) {
        return item.id;
    }

    trackSuperviseurById(index: number, item: ISuperviseur) {
        return item.id;
    }

    trackProfesseurById(index: number, item: IProfesseur) {
        return item.id;
    }

    trackSocieteById(index: number, item: ISociete) {
        return item.id;
    }

  onChange() {
    this.superviseurService.getBySociete(this.stage.societe).subscribe(res => this.superviseurs=res)
  }
}
