import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    SoutenanceComponent,
    SoutenanceDetailComponent,
    SoutenanceUpdateComponent,
    SoutenanceDeletePopupComponent,
    SoutenanceDeleteDialogComponent,
    soutenanceRoute,
    soutenancePopupRoute
} from './';
import {ProjectSharedModule} from "../../../shared/shared.module";

const ENTITY_STATES = [...soutenanceRoute, ...soutenancePopupRoute];

@NgModule({
    imports: [ProjectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SoutenanceComponent,
        SoutenanceDetailComponent,
        SoutenanceUpdateComponent,
        SoutenanceDeleteDialogComponent,
        SoutenanceDeletePopupComponent
    ],
    entryComponents: [SoutenanceComponent, SoutenanceUpdateComponent, SoutenanceDeleteDialogComponent, SoutenanceDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AzeSoutenanceModule {}
