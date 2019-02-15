import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    EnseignementComponent,
    EnseignementDetailComponent,
    EnseignementUpdateComponent,
    EnseignementDeletePopupComponent,
    EnseignementDeleteDialogComponent,
    enseignementRoute,
    enseignementPopupRoute
} from './';
import {ProjectSharedModule} from "../../../shared/shared.module";

const ENTITY_STATES = [...enseignementRoute, ...enseignementPopupRoute];

@NgModule({
    imports: [ProjectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EnseignementComponent,
        EnseignementDetailComponent,
        EnseignementUpdateComponent,
        EnseignementDeleteDialogComponent,
        EnseignementDeletePopupComponent
    ],
    entryComponents: [
        EnseignementComponent,
        EnseignementUpdateComponent,
        EnseignementDeleteDialogComponent,
        EnseignementDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AzeEnseignementModule {}
