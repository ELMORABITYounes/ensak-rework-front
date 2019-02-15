import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Stage } from 'app/shared/model/stage.model';
import { StageComponent } from './stage.component';
import { StageDetailComponent } from './stage-detail.component';
import { StageUpdateComponent } from './stage-update.component';
import { StageDeletePopupComponent } from './stage-delete-dialog.component';
import { IStage } from 'app/shared/model/stage.model';
import {UserRouteAccessService} from "../../../services/auth/user-route-access-service";
import {StageService} from "../../../services/entities";

@Injectable({ providedIn: 'root' })
export class StageResolve implements Resolve<IStage> {
    constructor(private service: StageService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Stage> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Stage>) => response.ok),
                map((stage: HttpResponse<Stage>) => stage.body)
            );
        }
        return of(new Stage());
    }
}

export const stageRoute: Routes = [
    {
        path: 'stage',
        component: StageComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Stages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'stage/:id/view',
        component: StageDetailComponent,
        resolve: {
            stage: StageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'stage/new',
        component: StageUpdateComponent,
        resolve: {
            stage: StageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stages'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'stage/:id/edit',
        component: StageUpdateComponent,
        resolve: {
            stage: StageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stages'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stagePopupRoute: Routes = [
    {
        path: 'stage/:id/delete',
        component: StageDeletePopupComponent,
        resolve: {
            stage: StageResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Stages'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
