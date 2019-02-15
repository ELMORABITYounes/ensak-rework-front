import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    FiliereComponent,
    FiliereDetailComponent,
    FiliereUpdateComponent,
    FiliereDeletePopupComponent,
    FiliereDeleteDialogComponent,
    filiereRoute,
    filierePopupRoute
} from './';
import {ProjectSharedModule} from "../../../shared/shared.module";

const ENTITY_STATES = [...filiereRoute, ...filierePopupRoute];

@NgModule({
    imports: [ProjectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FiliereComponent,
        FiliereDetailComponent,
        FiliereUpdateComponent,
        FiliereDeleteDialogComponent,
        FiliereDeletePopupComponent
    ],
    entryComponents: [FiliereComponent, FiliereUpdateComponent, FiliereDeleteDialogComponent, FiliereDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AzeFiliereModule {}
