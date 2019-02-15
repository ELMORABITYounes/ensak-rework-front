import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    DepartementComponent,
    DepartementDetailComponent,
    DepartementUpdateComponent,
    DepartementDeletePopupComponent,
    DepartementDeleteDialogComponent,
    departementRoute,
    departementPopupRoute
} from './';
import {ProjectSharedModule} from "../../../shared/shared.module";

const ENTITY_STATES = [...departementRoute, ...departementPopupRoute];

@NgModule({
    imports: [
      ProjectSharedModule,
      RouterModule.forChild(ENTITY_STATES)
    ],

    declarations: [
        DepartementComponent,
        DepartementDetailComponent,
        DepartementUpdateComponent,
        DepartementDeleteDialogComponent,
        DepartementDeletePopupComponent
    ],
    entryComponents: [DepartementComponent, DepartementUpdateComponent, DepartementDeleteDialogComponent, DepartementDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AzeDepartementModule {}
