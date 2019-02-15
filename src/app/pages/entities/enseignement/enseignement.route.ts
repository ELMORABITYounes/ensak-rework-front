import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Enseignement } from 'app/shared/model/enseignement.model';
import { EnseignementService } from '../../../services/entities/enseignement.service';
import { EnseignementComponent } from './enseignement.component';
import { EnseignementDetailComponent } from './enseignement-detail.component';
import { EnseignementUpdateComponent } from './enseignement-update.component';
import { EnseignementDeletePopupComponent } from './enseignement-delete-dialog.component';
import { IEnseignement } from 'app/shared/model/enseignement.model';
import {UserRouteAccessService} from "../../../services/auth/user-route-access-service";

@Injectable({ providedIn: 'root' })
export class EnseignementResolve implements Resolve<IEnseignement> {
    constructor(private service: EnseignementService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Enseignement> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Enseignement>) => response.ok),
                map((enseignement: HttpResponse<Enseignement>) => enseignement.body)
            );
        }
        return of(new Enseignement());
    }
}

export const enseignementRoute: Routes = [
    {
        path: 'enseignement',
        component: EnseignementComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Enseignements'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'enseignement/:id/view',
        component: EnseignementDetailComponent,
        resolve: {
            enseignement: EnseignementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Enseignements'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'enseignement/new',
        component: EnseignementUpdateComponent,
        resolve: {
            enseignement: EnseignementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Enseignements'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'enseignement/:id/edit',
        component: EnseignementUpdateComponent,
        resolve: {
            enseignement: EnseignementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Enseignements'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const enseignementPopupRoute: Routes = [
    {
        path: 'enseignement/:id/delete',
        component: EnseignementDeletePopupComponent,
        resolve: {
            enseignement: EnseignementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Enseignements'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
