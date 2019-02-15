import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import {Observable, of} from 'rxjs';
import {JhiResolvePagingParams} from "ng-jhipster";
import {UserRouteAccessService} from "../../services/auth/user-route-access-service";
import {EtudiantStagesComponent} from "./stages/etudiant-stages.component";
import {EtudiantModulesComponent} from "./modules/etudiant-modules.component";
import {EtudiantStageUpdateComponent} from "./stages/etudiant-stage-update.component";
import {IStage, Stage} from "../../shared/model/stage.model";
import {StageService} from "../../services/entities";
import {filter, map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";

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

export const espaceEtudiantRoutes: Routes = [
  {
    path: 'stages',
    component: EtudiantStagesComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_STUDENT'],
      defaultSort: 'id,asc',
      pageTitle: 'Stages'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'modules',
    component: EtudiantModulesComponent,
    data: {
      authorities: ['ROLE_STUDENT'],
      pageTitle: 'Stages'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'stage/:id/edit',
    component: EtudiantStageUpdateComponent,
    resolve: {
      stage: StageResolve
    },
    data: {
      authorities: ['ROLE_STUDENT'],
      pageTitle: 'Stages'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'stage/new',
    component: EtudiantStageUpdateComponent,
    resolve: {
      stage: StageResolve
    },
    data: {
      authorities: ['ROLE_STUDENT'],
      pageTitle: 'Stages'
    },
    canActivate: [UserRouteAccessService]
  },
];
