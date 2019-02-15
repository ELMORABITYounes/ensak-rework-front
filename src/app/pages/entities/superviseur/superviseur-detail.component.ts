import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISuperviseur } from 'app/shared/model/superviseur.model';

@Component({
    selector: 'jhi-superviseur-detail',
    templateUrl: './superviseur-detail.component.html'
})
export class SuperviseurDetailComponent implements OnInit {
    superviseur: ISuperviseur;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ superviseur }) => {
            this.superviseur = superviseur;
        });
    }

    previousState() {
        window.history.back();
    }
}
