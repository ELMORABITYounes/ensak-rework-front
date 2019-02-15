import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    EtudiantComponent,
    EtudiantDetailComponent,
    EtudiantUpdateComponent,
    EtudiantImportComponent,
    EtudiantDeletePopupComponent,
    EtudiantDeleteDialogComponent,
    etudiantRoute,
    etudiantPopupRoute
} from './';
import {ProjectSharedModule} from "../../../shared/shared.module";

const ENTITY_STATES = [...etudiantRoute, ...etudiantPopupRoute];

@NgModule({
    imports: [ProjectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EtudiantComponent,
        EtudiantDetailComponent,
        EtudiantUpdateComponent,
        EtudiantDeleteDialogComponent,
        EtudiantDeletePopupComponent,
        EtudiantImportComponent,
    ],
    entryComponents: [EtudiantComponent, EtudiantImportComponent , EtudiantUpdateComponent, EtudiantDeleteDialogComponent, EtudiantDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AzeEtudiantModule {}
