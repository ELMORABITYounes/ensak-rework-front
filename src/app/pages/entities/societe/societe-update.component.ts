import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISociete } from 'app/shared/model/societe.model';
import { SocieteService } from '../../../services/entities/societe.service';
import {JhiAlertService} from "ng-jhipster";

@Component({
    selector: 'jhi-societe-update',
    templateUrl: './societe-update.component.html'
})
export class SocieteUpdateComponent implements OnInit {
    societe: ISociete;
    isSaving: boolean;

    constructor(protected societeService: SocieteService, protected activatedRoute: ActivatedRoute,protected jhiAlertService:JhiAlertService) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ societe }) => {
            this.societe = societe;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.societe.id !== undefined) {
            this.subscribeToSaveResponse(this.societeService.update(this.societe));
        } else {
            this.subscribeToSaveResponse(this.societeService.create(this.societe));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISociete>>) {
        result.subscribe((res: HttpResponse<ISociete>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
      this.jhiAlertService.success("Ajout/modification effectue correctement", null, null);

      this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
