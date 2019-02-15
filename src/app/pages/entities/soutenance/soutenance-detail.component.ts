import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISoutenance } from 'app/shared/model/soutenance.model';

@Component({
    selector: 'jhi-soutenance-detail',
    templateUrl: './soutenance-detail.component.html'
})
export class SoutenanceDetailComponent implements OnInit {
    soutenance: ISoutenance;
    idStage:number;
    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ soutenance }) => {
            this.soutenance = soutenance;
        });
      this.activatedRoute.paramMap.subscribe(params => {
        this.idStage=Number(params.get("idStage"))
      });
    }

    previousState() {
        window.history.back();
    }
}
