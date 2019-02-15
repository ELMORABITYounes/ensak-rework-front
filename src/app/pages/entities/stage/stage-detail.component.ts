import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStage } from 'app/shared/model/stage.model';

@Component({
    selector: 'jhi-stage-detail',
    templateUrl: './stage-detail.component.html'
})
export class StageDetailComponent implements OnInit {
    stage: IStage;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stage }) => {
            this.stage = stage;
        });
    }

    previousState() {
        window.history.back();
    }
}
