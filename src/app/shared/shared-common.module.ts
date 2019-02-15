import { NgModule } from '@angular/core';

import { JhiAlertComponent, JhiAlertErrorComponent } from './';
import {ProjectSharedLibsModule} from "./shared-libs.module";
import {ThemeModule} from "../@theme/theme.module";

@NgModule({
    imports: [ProjectSharedLibsModule,ThemeModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [ProjectSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent,ThemeModule]
})
export class ProjectSharedCommonModule {}
