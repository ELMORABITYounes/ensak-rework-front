import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IModule } from 'app/shared/model/module.model';
import { IDepartement } from 'app/shared/model/departement.model';
import {DepartementService, ModuleService} from "../../../services/entities";

@Component({
    selector: 'jhi-module-update',
    templateUrl: './module-update.component.html'
})
export class ModuleUpdateComponent implements OnInit {
    module: IModule;
    isSaving: boolean;

    departements: IDepartement[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected moduleService: ModuleService,
        protected departementService: DepartementService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ module }) => {
            this.module = module;
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
        if (this.module.id !== undefined) {
            this.subscribeToSaveResponse(this.moduleService.update(this.module));
        } else {
            this.subscribeToSaveResponse(this.moduleService.create(this.module));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IModule>>) {
        result.subscribe((res: HttpResponse<IModule>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
