import {Component, ElementRef, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {JhiAlertService, JhiDataUtils} from 'ng-jhipster';

import { IProfesseur } from 'app/shared/model/professeur.model';
import { IDepartement } from 'app/shared/model/departement.model';
import {DepartementService, ProfesseurService} from "../../../services/entities";

@Component({
    selector: 'jhi-professeur-update',
    templateUrl: './professeur-update.component.html'
})
export class ProfesseurUpdateComponent implements OnInit {
    professeur: IProfesseur;
    isSaving: boolean;

    departements: IDepartement[];

    constructor(
      protected elementRef: ElementRef,
      protected jhiAlertService: JhiAlertService,
        protected professeurService: ProfesseurService,
        protected departementService: DepartementService,
        protected activatedRoute: ActivatedRoute,
      protected dataUtils: JhiDataUtils,

    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe((data) => {
            this.professeur = data.professeur;
        });
        this.departementService.query().subscribe(
            (res: HttpResponse<IDepartement[]>) => {
                this.departements = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.professeur.id !== undefined) {
            this.subscribeToSaveResponse(this.professeurService.update(this.professeur));
        } else {
            this.subscribeToSaveResponse(this.professeurService.create(this.professeur));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfesseur>>) {
        result.subscribe((res: HttpResponse<IProfesseur>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDepartementById(index: number, item: IDepartement) {
        return item.id;
    }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, entity, field, isImage) {
    this.dataUtils.setFileData(event, entity, field, isImage);
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string) {
    this.dataUtils.clearInputImage(this.professeur, this.elementRef, field, fieldContentType, idInput);
  }
}
