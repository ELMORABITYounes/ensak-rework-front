import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { IModule } from 'app/shared/model/module.model';
import {ModuleService} from "../../../services/entities";

@Component({
    selector: 'jhi-module',
    templateUrl: './etudiant-modules.component.html'
})
export class EtudiantModulesComponent implements OnInit, OnDestroy {
    modules: IModule[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    loading:boolean=true;

    constructor(
        protected moduleService: ModuleService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager
    ) {
    }

    loadAll() {
        this.moduleService
            .queryByUser()
            .subscribe(
                (res:IModule[]) => {
                  this.loading=false;
                  this.modules=res;
                }
                  ,
                    (res: HttpErrorResponse) => {
                      this.loading=false;
                      this.onError(res.message)
                }
            );
    }


    ngOnInit() {
        this.loadAll();
        this.registerChangeInModules();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IModule) {
        return item.id;
    }

    registerChangeInModules() {
        this.eventSubscriber = this.eventManager.subscribe('moduleListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
