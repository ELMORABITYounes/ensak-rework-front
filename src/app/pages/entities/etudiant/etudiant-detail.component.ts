import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEtudiant } from 'app/shared/model/etudiant.model';
import {JhiDataUtils} from "ng-jhipster";

@Component({
    selector: 'jhi-etudiant-detail',
    templateUrl: './etudiant-detail.component.html'
})
export class EtudiantDetailComponent implements OnInit {
    etudiant: IEtudiant;

    constructor(protected activatedRoute: ActivatedRoute,
                protected dataUtils: JhiDataUtils,
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ etudiant }) => {
            this.etudiant = etudiant;
        });
    }

    previousState() {
        window.history.back();
    }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
}
