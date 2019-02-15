import {Component, ElementRef, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {JhiAlertService, JhiDataUtils} from 'ng-jhipster';

import { IEtudiant } from 'app/shared/model/etudiant.model';
import { INiveau } from 'app/shared/model/niveau.model';
import {EtudiantService, NiveauService} from "../../../services/entities";

@Component({
    selector: 'jhi-etudiant-update',
    templateUrl: './etudiant-update.component.html'
})
export class EtudiantUpdateComponent implements OnInit {
    etudiant: IEtudiant;
    isSaving: boolean;

    niveaus: INiveau[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected etudiantService: EtudiantService,
        protected niveauService: NiveauService,
        protected activatedRoute: ActivatedRoute,
        protected dataUtils: JhiDataUtils,
        protected elementRef: ElementRef,

    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ etudiant }) => {
            this.etudiant = etudiant;
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
        console.log(this.etudiant)
        if (this.etudiant.id !== undefined) {
            this.subscribeToSaveResponse(this.etudiantService.update(this.etudiant));
        } else {
            this.subscribeToSaveResponse(this.etudiantService.create(this.etudiant));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEtudiant>>) {
        result.subscribe((res: HttpResponse<IEtudiant>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    this.dataUtils.clearInputImage(this.etudiant, this.elementRef, field, fieldContentType, idInput);
  }
}
