import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ProjectSharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {espaceProfesseurRoutes} from "./espace-professeur.route";
import {ProfesseurStagesComponent} from "./stages/professeur-stages.component";
import {ProfesseurEnseignementsComponent} from "./enseignement/professeur-enseignements.component";

@NgModule({
  imports: [
    ProjectSharedModule,
    RouterModule.forChild(espaceProfesseurRoutes)
  ],
  declarations: [
    ProfesseurStagesComponent,ProfesseurEnseignementsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EspaceProfesseurModule { }
