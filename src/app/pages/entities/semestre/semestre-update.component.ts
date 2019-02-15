import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISemestre } from 'app/shared/model/semestre.model';
import { INiveau } from 'app/shared/model/niveau.model';
import {NiveauService, SemestreService} from "../../../services/entities";

@Component({
    selector: 'jhi-semestre-update',
    templateUrl: './semestre-update.component.html'
})
export class SemestreUpdateComponent implements OnInit {
    semestre: ISemestre;
    isSaving: boolean;

    niveaus: INiveau[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected semestreService: SemestreService,
        protected niveauService: NiveauService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ semestre }) => {
            this.semestre = semestre;
        });
        this.niveauService.query().subscribe(
            (res: HttpResponse<INiveau[]>) => {
                this.niveaus = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.semestre.id !== undefined) {
            this.subscribeToSaveResponse(this.semestreService.update(this.semestre));
        } else {
            this.subscribeToSaveResponse(this.semestreService.create(this.semestre));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISemestre>>) {
        result.subscribe((res: HttpResponse<ISemestre>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackNiveauById(index: number, item: INiveau) {
        return item.id;
    }
}
