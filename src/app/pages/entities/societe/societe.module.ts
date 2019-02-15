import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    SocieteComponent,
    SocieteDetailComponent,
    SocieteUpdateComponent,
    SocieteDeletePopupComponent,
    SocieteDeleteDialogComponent,
    societeRoute,
    societePopupRoute
} from './';
import {ProjectSharedModule} from "../../../shared/shared.module";

const ENTITY_STATES = [...societeRoute, ...societePopupRoute];

@NgModule({
    imports: [ProjectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SocieteComponent,
        SocieteDetailComponent,
        SocieteUpdateComponent,
        SocieteDeleteDialogComponent,
        SocieteDeletePopupComponent
    ],
    entryComponents: [SocieteComponent, SocieteUpdateComponent, SocieteDeleteDialogComponent, SocieteDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AzeSocieteModule {}
