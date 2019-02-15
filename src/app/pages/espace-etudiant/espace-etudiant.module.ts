import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';


import {ProjectSharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {espaceEtudiantRoutes} from "./espace-etudiant.route";
import {EtudiantStagesComponent} from "./stages/etudiant-stages.component";
import {EtudiantModulesComponent} from "./modules/etudiant-modules.component";
import {EtudiantStageUpdateComponent} from "./stages/etudiant-stage-update.component";

@NgModule({
  imports: [
    ProjectSharedModule,
    RouterModule.forChild(espaceEtudiantRoutes)
  ],
  declarations: [
    EtudiantStagesComponent,EtudiantModulesComponent,EtudiantStageUpdateComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EspaceEtudiantModule { }
