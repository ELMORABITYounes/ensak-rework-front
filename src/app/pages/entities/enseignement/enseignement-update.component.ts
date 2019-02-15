import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IEnseignement } from 'app/shared/model/enseignement.model';
import { ISemestre } from 'app/shared/model/semestre.model';
import { IModule } from 'app/shared/model/module.model';
import { IProfesseur } from 'app/shared/model/professeur.model';
import {EnseignementService, ModuleService, ProfesseurService, SemestreService} from "../../../services/entities";

@Component({
    selector: 'jhi-enseignement-update',
    templateUrl: './enseignement-update.component.html'
})
export class EnseignementUpdateComponent implements OnInit {
    enseignement: IEnseignement;
    isSaving: boolean;

    semestres: ISemestre[];

    modules: IModule[];

    professeurs: IProfesseur[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected enseignementService: EnseignementService,
        protected semestreService: SemestreService,
        protected moduleService: ModuleService,
        protected professeurService: ProfesseurService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ enseignement }) => {
            this.enseignement = enseignement;
        });
        this.semestreService.query().subscribe(
            (res: HttpResponse<ISemestre[]>) => {
                this.semestres = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.moduleService.query().subscribe(
            (res: HttpResponse<IModule[]>) => {
                this.modules = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.professeurService.query().subscribe(
            (res: HttpResponse<IProfesseur[]>) => {
                this.professeurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.enseignement.id !== undefined) {
            this.subscribeToSaveResponse(this.enseignementService.update(this.enseignement));
        } else {
            this.subscribeToSaveResponse(this.enseignementService.create(this.enseignement));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEnseignement>>) {
        result.subscribe((res: HttpResponse<IEnseignement>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
      this.jhiAlertService.success("Ajout/modification effectue correctement", null, null);
      this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackSemestreById(index: number, item: ISemestre) {
        return item.id;
    }

    trackModuleById(index: number, item: IModule) {
        return item.id;
    }

    trackProfesseurById(index: number, item: IProfesseur) {
        return item.id;
    }
}
