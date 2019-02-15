import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    ModuleComponent,
    ModuleDetailComponent,
    ModuleUpdateComponent,
    ModuleDeletePopupComponent,
    ModuleDeleteDialogComponent,
    moduleRoute,
    modulePopupRoute
} from './';
import {ProjectSharedModule} from "../../../shared/shared.module";

const ENTITY_STATES = [...moduleRoute, ...modulePopupRoute];

@NgModule({
    imports: [ProjectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ModuleComponent, ModuleDetailComponent, ModuleUpdateComponent, ModuleDeleteDialogComponent, ModuleDeletePopupComponent],
    entryComponents: [ModuleComponent, ModuleUpdateComponent, ModuleDeleteDialogComponent, ModuleDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AzeModuleModule {}
