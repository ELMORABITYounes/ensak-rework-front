import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDepartement } from 'app/shared/model/departement.model';
import {DepartementService} from "../../../services/entities";
import {JhiAlertService} from "ng-jhipster";

@Component({
    selector: 'jhi-departement-update',
    templateUrl: './departement-update.component.html'
})
export class DepartementUpdateComponent implements OnInit {
    departement: IDepartement;
    isSaving: boolean;

    constructor(
      protected jhiAlertService: JhiAlertService,
      protected departementService: DepartementService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ departement }) => {
            this.departement = departement;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.departement.id !== null) {
            this.subscribeToSaveResponse(this.departementService.update(this.departement));
        } else {
            this.subscribeToSaveResponse(this.departementService.create(this.departement));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepartement>>) {
        result.subscribe((res: HttpResponse<IDepartement>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
