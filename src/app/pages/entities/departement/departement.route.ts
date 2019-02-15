import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Departement } from 'app/shared/model/departement.model';
import { DepartementService } from '../../../services/entities/departement.service';
import { DepartementComponent } from './departement.component';
import { DepartementDetailComponent } from './departement-detail.component';
import { DepartementUpdateComponent } from './departement-update.component';
import { DepartementDeletePopupComponent } from './departement-delete-dialog.component';
import { IDepartement } from 'app/shared/model/departement.model';
import {UserRouteAccessService} from "../../../services/auth/user-route-access-service";

@Injectable({ providedIn: 'root' })
export class DepartementResolve implements Resolve<IDepartement> {
    constructor(private service: DepartementService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Departement> {
      const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Departement>) => response.ok),
                map((departement: HttpResponse<Departement>) => departement.body)
            );
        }
        return of(new Departement());
    }
}

export const departementRoute: Routes = [
    {
        path: 'departement',
        component: DepartementComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Departements'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'departement/:id/view',
        component: DepartementDetailComponent,
        resolve: {
            departement: DepartementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Departements'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'departement/new',
        component: DepartementUpdateComponent,
        resolve: {
            departement: DepartementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Departements'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'departement/:id/edit',
        component: DepartementUpdateComponent,
        resolve: {
            departement: DepartementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Departements'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const departementPopupRoute: Routes = [
    {
        path: 'departement/:id/delete',
        component: DepartementDeletePopupComponent,
        resolve: {
            departement: DepartementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Departements'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
