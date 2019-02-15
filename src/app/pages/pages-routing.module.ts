import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {UserRouteAccessService} from "../services/auth/user-route-access-service";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    { path: 'etudiants',
      loadChildren: './entities/etudiant/etudiant.module#AzeEtudiantModule'
    },
    { path: 'profile',
      loadChildren: './profile-infos/profile.module#ProfileModule'
    },
    { path: 'professeurs',
      loadChildren: './entities/professeur/professeur.module#AzeProfesseurModule'
    },
    { path: 'filieres',
      loadChildren: './entities/filiere/filiere.module#AzeFiliereModule'
    },
    { path: 'departements',
      loadChildren: './entities/departement/departement.module#AzeDepartementModule'
    },
    { path: 'modules',
      loadChildren: './entities/module/module.module#AzeModuleModule'
    },
    { path: 'enseignements',
      loadChildren: './entities/enseignement/enseignement.module#AzeEnseignementModule'
    },
    { path: 'niveaux',
      loadChildren: './entities/niveau/niveau.module#AzeNiveauModule'
    },
    { path: 'semestres',
      loadChildren: './entities/semestre/semestre.module#AzeSemestreModule'
    },
    { path: 'societes',
      loadChildren: './entities/societe/societe.module#AzeSocieteModule'
    },
    { path: 'superviseurs',
      loadChildren: './entities/superviseur/superviseur.module#AzeSuperviseurModule'
    },
    { path: 'stages',
      loadChildren: './entities/stage/stage.module#AzeStageModule'
    },
    { path: 'soutenances',
      loadChildren: './entities/soutenance/soutenance.module#AzeSoutenanceModule'
    },
    { path: 'professeur',
      loadChildren: './espace-professeur/espace-professeur.module#EspaceProfesseurModule'
    },
    { path: 'etudiant',
      loadChildren: './espace-etudiant/espace-etudiant.module#EspaceEtudiantModule'
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Dashboard'
      },
      canActivate: [UserRouteAccessService]
    },
    { path: 'error', 
    loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule' 
    },
    {
      path:'**',
      redirectTo:"error"
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
