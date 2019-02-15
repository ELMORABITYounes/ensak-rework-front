import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    SuperviseurComponent,
    SuperviseurDetailComponent,
    SuperviseurUpdateComponent,
    SuperviseurDeletePopupComponent,
    SuperviseurDeleteDialogComponent,
    superviseurRoute,
    superviseurPopupRoute
} from './';
import {ProjectSharedModule} from "../../../shared/shared.module";

const ENTITY_STATES = [...superviseurRoute, ...superviseurPopupRoute];

@NgModule({
    imports: [ProjectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SuperviseurComponent,
        SuperviseurDetailComponent,
        SuperviseurUpdateComponent,
        SuperviseurDeleteDialogComponent,
        SuperviseurDeletePopupComponent
    ],
    entryComponents: [SuperviseurComponent, SuperviseurUpdateComponent, SuperviseurDeleteDialogComponent, SuperviseurDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AzeSuperviseurModule {}
