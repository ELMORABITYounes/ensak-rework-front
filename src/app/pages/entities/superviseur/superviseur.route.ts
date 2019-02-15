import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Superviseur } from 'app/shared/model/superviseur.model';
import { SuperviseurService } from '../../../services/entities/superviseur.service';
import { SuperviseurComponent } from './superviseur.component';
import { SuperviseurDetailComponent } from './superviseur-detail.component';
import { SuperviseurUpdateComponent } from './superviseur-update.component';
import { SuperviseurDeletePopupComponent } from './superviseur-delete-dialog.component';
import { ISuperviseur } from 'app/shared/model/superviseur.model';
import {UserRouteAccessService} from "../../../services/auth/user-route-access-service";

@Injectable({ providedIn: 'root' })
export class SuperviseurResolve implements Resolve<ISuperviseur> {
    constructor(private service: SuperviseurService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Superviseur> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Superviseur>) => response.ok),
                map((superviseur: HttpResponse<Superviseur>) => superviseur.body)
            );
        }
        return of(new Superviseur());
    }
}

export const superviseurRoute: Routes = [
  {
    path: 'superviseur/new',
    component: SuperviseurUpdateComponent,
    resolve: {
      superviseur: SuperviseurResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Superviseurs'
    },
    canActivate: [UserRouteAccessService]
  },
    {
        path: 'superviseur/:id',
        component: SuperviseurComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Superviseurs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'superviseur/:id/view',
        component: SuperviseurDetailComponent,
        resolve: {
            superviseur: SuperviseurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Superviseurs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'superviseur/:id/edit',
        component: SuperviseurUpdateComponent,
        resolve: {
            superviseur: SuperviseurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Superviseurs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const superviseurPopupRoute: Routes = [
    {
        path: 'superviseur/:id/delete',
        component: SuperviseurDeletePopupComponent,
        resolve: {
            superviseur: SuperviseurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Superviseurs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
