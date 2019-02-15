import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IFiliere } from 'app/shared/model/filiere.model';
import { FiliereService } from '../../../services/entities/filiere.service';
import {JhiAlertService} from "ng-jhipster";

@Component({
    selector: 'jhi-filiere-update',
    templateUrl: './filiere-update.component.html'
})
export class FiliereUpdateComponent implements OnInit {
    filiere: IFiliere;
    isSaving: boolean;

    constructor(protected filiereService: FiliereService, protected activatedRoute: ActivatedRoute,
                protected jhiAlertService:JhiAlertService) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ filiere }) => {
            this.filiere = filiere;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.filiere.id !== undefined) {
            this.subscribeToSaveResponse(this.filiereService.update(this.filiere));
        } else {
            this.subscribeToSaveResponse(this.filiereService.create(this.filiere));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFiliere>>) {
        result.subscribe((res: HttpResponse<IFiliere>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
      this.jhiAlertService.success("Ajout/modification effectue correctement", null, null);
      this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
