import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMembreJury } from 'app/shared/model/membre-jury.model';
import { ISoutenance } from 'app/shared/model/soutenance.model';
import {MembreJuryService, SoutenanceService} from "../../../services/entities";

@Component({
    selector: 'jhi-membre-jury-update',
    templateUrl: './membre-jury-update.component.html'
})
export class MembreJuryUpdateComponent implements OnInit {
    membreJury: IMembreJury;
    isSaving: boolean;

    soutenances: ISoutenance[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected membreJuryService: MembreJuryService,
        protected soutenanceService: SoutenanceService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ membreJury }) => {
            this.membreJury = membreJury;
        });
        this.soutenanceService.query().subscribe(
            (res: HttpResponse<ISoutenance[]>) => {
                this.soutenances = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.membreJury.id !== undefined) {
            this.subscribeToSaveResponse(this.membreJuryService.update(this.membreJury));
        } else {
            this.subscribeToSaveResponse(this.membreJuryService.create(this.membreJury));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMembreJury>>) {
        result.subscribe((res: HttpResponse<IMembreJury>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSoutenanceById(index: number, item: ISoutenance) {
        return item.id;
    }
}
