import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { HasAnyAuthorityDirective } from './';
import {ProjectSharedLibsModule} from "./shared-libs.module";
import {ProjectSharedCommonModule} from "./shared-common.module";

@NgModule({
    imports: [ProjectSharedLibsModule, ProjectSharedCommonModule],
    declarations: [HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [],
    exports: [ProjectSharedCommonModule, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectSharedModule {
    static forRoot() {
        return {
            ngModule: ProjectSharedModule
        };
    }
}
