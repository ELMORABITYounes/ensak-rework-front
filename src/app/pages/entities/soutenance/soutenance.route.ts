import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Soutenance } from 'app/shared/model/soutenance.model';
import { SoutenanceComponent } from './soutenance.component';
import { SoutenanceDetailComponent } from './soutenance-detail.component';
import { SoutenanceUpdateComponent } from './soutenance-update.component';
import { SoutenanceDeletePopupComponent } from './soutenance-delete-dialog.component';
import { ISoutenance } from 'app/shared/model/soutenance.model';
import {UserRouteAccessService} from "../../../services/auth/user-route-access-service";
import {IStage, Stage} from "../../../shared/model/stage.model";
import {SoutenanceService, StageService} from "../../../services/entities";

@Injectable({ providedIn: 'root' })
export class SoutenanceResolve implements Resolve<ISoutenance> {
    constructor(private service: SoutenanceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Soutenance> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Soutenance>) => response.ok),
                map((soutenance: HttpResponse<Soutenance>) => soutenance.body)
            );
        }
        return of(new Soutenance());
    }
}
@Injectable({ providedIn: 'root' })
export class StageResolve implements Resolve<IStage> {
  constructor(private service: StageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Stage> {
    const id = route.params['idStage'] ? route.params['idStage'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Stage>) => response.ok),
        map((stage: HttpResponse<Stage>) => stage.body)
      );
    }
    return of(new Stage());
  }
}

export const soutenanceRoute: Routes = [
    {
        path: 'soutenance',
        component: SoutenanceComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Soutenances'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'soutenance/:id/view/:idStage',
        component: SoutenanceDetailComponent,
        resolve: {
            soutenance: SoutenanceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Soutenances'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'soutenance/new/:idStage',
        component: SoutenanceUpdateComponent,
        resolve: {
            soutenance: SoutenanceResolve,
          stage: StageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Soutenances'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'soutenance/:id/edit/:idStage',
        component: SoutenanceUpdateComponent,
        resolve: {
            soutenance: SoutenanceResolve,
          stage: StageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Soutenances'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const soutenancePopupRoute: Routes = [
    {
        path: 'soutenance/:id/delete',
        component: SoutenanceDeletePopupComponent,
        resolve: {
            soutenance: SoutenanceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Soutenances'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
