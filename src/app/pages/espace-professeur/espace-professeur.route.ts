import { Routes } from '@angular/router';
import {UserRouteAccessService} from "../../services/auth/user-route-access-service";
import {JhiResolvePagingParams} from "ng-jhipster";
import {ProfesseurStagesComponent} from "./stages/professeur-stages.component";
import {ProfesseurEnseignementsComponent} from "./enseignement/professeur-enseignements.component";

export const espaceProfesseurRoutes: Routes = [
  {
    path: 'stages',
    component: ProfesseurStagesComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_TEACHER'],
      defaultSort: 'id,asc',
      pageTitle: 'Stages'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'enseignements',
    component: ProfesseurEnseignementsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_TEACHER'],
      defaultSort: 'id,asc',
      pageTitle: 'Stages'
    },
    canActivate: [UserRouteAccessService]
  }
];
