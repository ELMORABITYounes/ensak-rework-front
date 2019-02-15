import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    StageComponent,
    StageDetailComponent,
    StageUpdateComponent,
    StageDeletePopupComponent,
    StageDeleteDialogComponent,
    stageRoute,
    stagePopupRoute
} from './';
import {ProjectSharedModule} from "../../../shared/shared.module";

const ENTITY_STATES = [...stageRoute, ...stagePopupRoute];

@NgModule({
    imports: [ProjectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [StageComponent, StageDetailComponent, StageUpdateComponent, StageDeleteDialogComponent, StageDeletePopupComponent],
    entryComponents: [StageComponent, StageUpdateComponent, StageDeleteDialogComponent, StageDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AzeStageModule {}
