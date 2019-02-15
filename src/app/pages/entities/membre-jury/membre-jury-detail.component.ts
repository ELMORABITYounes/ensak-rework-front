import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMembreJury } from 'app/shared/model/membre-jury.model';

@Component({
    selector: 'jhi-membre-jury-detail',
    templateUrl: './membre-jury-detail.component.html'
})
export class MembreJuryDetailComponent implements OnInit {
    membreJury: IMembreJury;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ membreJury }) => {
            this.membreJury = membreJury;
        });
    }

    previousState() {
        window.history.back();
    }
}
