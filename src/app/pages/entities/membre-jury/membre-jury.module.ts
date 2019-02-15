import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    MembreJuryComponent,
    MembreJuryDetailComponent,
    MembreJuryUpdateComponent,
    MembreJuryDeletePopupComponent,
    MembreJuryDeleteDialogComponent,
    membreJuryRoute,
    membreJuryPopupRoute
} from './';
import {ProjectSharedModule} from "../../../shared/shared.module";

const ENTITY_STATES = [...membreJuryRoute, ...membreJuryPopupRoute];

@NgModule({
    imports: [ProjectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MembreJuryComponent,
        MembreJuryDetailComponent,
        MembreJuryUpdateComponent,
        MembreJuryDeleteDialogComponent,
        MembreJuryDeletePopupComponent
    ],
    entryComponents: [MembreJuryComponent, MembreJuryUpdateComponent, MembreJuryDeleteDialogComponent, MembreJuryDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AzeMembreJuryModule {}
