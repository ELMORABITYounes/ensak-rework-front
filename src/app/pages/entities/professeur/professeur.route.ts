import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Professeur } from 'app/shared/model/professeur.model';
import { ProfesseurService } from '../../../services/entities/professeur.service';
import { ProfesseurComponent } from './professeur.component';
import { ProfesseurDetailComponent } from './professeur-detail.component';
import { ProfesseurUpdateComponent } from './professeur-update.component';
import { ProfesseurDeletePopupComponent } from './professeur-delete-dialog.component';
import { IProfesseur } from 'app/shared/model/professeur.model';
import {UserRouteAccessService} from "../../../services/auth/user-route-access-service";
import {ProfesseurImportComponent} from "./professeur-import.component";

@Injectable({ providedIn: 'root' })
export class ProfesseurResolve implements Resolve<IProfesseur> {
    constructor(private service: ProfesseurService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Professeur> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Professeur>) => response.ok),
                map((professeur: HttpResponse<Professeur>) => professeur.body)
            );
        }
        return of(new Professeur());
    }
}

export const professeurRoute: Routes = [
    {
        path: 'professeur',
        component: ProfesseurComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Professeurs'
        },
        canActivate: [UserRouteAccessService]
    },
  {
    path: 'import',
    component: ProfesseurImportComponent,
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Professeurs'
    },
    canActivate: [UserRouteAccessService]
  },
    {
        path: 'professeur/:id/view',
        component: ProfesseurDetailComponent,
        resolve: {
            professeur: ProfesseurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Professeurs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'professeur/new',
        component: ProfesseurUpdateComponent,
        resolve: {
            professeur: ProfesseurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Professeurs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'professeur/:id/edit',
        component: ProfesseurUpdateComponent,
        resolve: {
            professeur: ProfesseurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Professeurs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const professeurPopupRoute: Routes = [
    {
        path: 'professeur/:id/delete',
        component: ProfesseurDeletePopupComponent,
        resolve: {
            professeur: ProfesseurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Professeurs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
