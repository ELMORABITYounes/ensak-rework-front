import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISuperviseur } from 'app/shared/model/superviseur.model';
import { ISociete } from 'app/shared/model/societe.model';
import {SocieteService, SuperviseurService} from "../../../services/entities";

@Component({
    selector: 'jhi-superviseur-update',
    templateUrl: './superviseur-update.component.html'
})
export class SuperviseurUpdateComponent implements OnInit {
    superviseur: ISuperviseur;
    isSaving: boolean;

    societes: ISociete[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected superviseurService: SuperviseurService,
        protected societeService: SocieteService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ superviseur }) => {
            this.superviseur = superviseur;
        });
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
        if (this.superviseur.id !== undefined) {
            this.subscribeToSaveResponse(this.superviseurService.update(this.superviseur));
        } else {
            this.subscribeToSaveResponse(this.superviseurService.create(this.superviseur));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISuperviseur>>) {
        result.subscribe((res: HttpResponse<ISuperviseur>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
      this.jhiAlertService.success("Ajout/modification effectue correctement", null, null);
      this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackSocieteById(index: number, item: ISociete) {
        return item.id;
    }
}
