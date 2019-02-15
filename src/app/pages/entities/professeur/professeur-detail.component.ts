import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProfesseur } from 'app/shared/model/professeur.model';
import {JhiDataUtils} from "ng-jhipster";

@Component({
    selector: 'jhi-professeur-detail',
    templateUrl: './professeur-detail.component.html'
})
export class ProfesseurDetailComponent implements OnInit {
    professeur: IProfesseur;

    constructor(protected activatedRoute: ActivatedRoute,
                protected dataUtils: JhiDataUtils,
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ professeur }) => {
            this.professeur = professeur;
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
