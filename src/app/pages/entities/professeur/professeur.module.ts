import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    ProfesseurComponent,
    ProfesseurDetailComponent,
  ProfesseurUpdateComponent,
  ProfesseurImportComponent,
    ProfesseurDeletePopupComponent,
    ProfesseurDeleteDialogComponent,
    professeurRoute,
    professeurPopupRoute
} from './';
import {ProjectSharedModule} from "../../../shared/shared.module";

const ENTITY_STATES = [...professeurRoute, ...professeurPopupRoute];

@NgModule({
    imports: [ProjectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProfesseurComponent,
        ProfesseurDetailComponent,
        ProfesseurUpdateComponent,
        ProfesseurDeleteDialogComponent,
        ProfesseurDeletePopupComponent,
      ProfesseurImportComponent
    ],
    entryComponents: [ProfesseurComponent, ProfesseurUpdateComponent, ProfesseurImportComponent,ProfesseurDeleteDialogComponent, ProfesseurDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AzeProfesseurModule {}
