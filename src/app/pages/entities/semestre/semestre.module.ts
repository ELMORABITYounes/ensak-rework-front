import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    SemestreComponent,
    SemestreDetailComponent,
    SemestreUpdateComponent,
    SemestreDeletePopupComponent,
    SemestreDeleteDialogComponent,
    semestreRoute,
    semestrePopupRoute
} from './';
import {ProjectSharedModule} from "../../../shared/shared.module";

const ENTITY_STATES = [...semestreRoute, ...semestrePopupRoute];

@NgModule({
    imports: [ProjectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SemestreComponent,
        SemestreDetailComponent,
        SemestreUpdateComponent,
        SemestreDeleteDialogComponent,
        SemestreDeletePopupComponent
    ],
    entryComponents: [SemestreComponent, SemestreUpdateComponent, SemestreDeleteDialogComponent, SemestreDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AzeSemestreModule {}
