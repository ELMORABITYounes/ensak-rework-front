import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { INiveau } from 'app/shared/model/niveau.model';
import { IFiliere } from 'app/shared/model/filiere.model';
import {FiliereService, NiveauService} from "../../../services/entities";

@Component({
    selector: 'jhi-niveau-update',
    templateUrl: './niveau-update.component.html'
})
export class NiveauUpdateComponent implements OnInit {
    niveau: INiveau;
    isSaving: boolean;

    filieres: IFiliere[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected niveauService: NiveauService,
        protected filiereService: FiliereService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ niveau }) => {
            this.niveau = niveau;
        });
        this.filiereService.query().subscribe(
            (res: HttpResponse<IFiliere[]>) => {
                this.filieres = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.niveau.id !== undefined) {
            this.subscribeToSaveResponse(this.niveauService.update(this.niveau));
        } else {
            this.subscribeToSaveResponse(this.niveauService.create(this.niveau));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<INiveau>>) {
        result.subscribe((res: HttpResponse<INiveau>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackFiliereById(index: number, item: IFiliere) {
        return item.id;
    }
}
