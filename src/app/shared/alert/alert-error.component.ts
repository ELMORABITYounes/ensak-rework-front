import { Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { JhiEventManager, JhiAlert, JhiAlertService } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import {NbGlobalPosition, NbToastrService} from "@nebular/theme";
import {NbToastStatus} from "@nebular/theme/components/toastr/model";

@Component({
    selector: 'jhi-alert-error',
    template: `
        <div>
        </div>
    `
})
export class JhiAlertErrorComponent implements OnDestroy {
    alerts: any[];
    cleanHttpErrorListener: Subscription;
    /* tslint:disable */
    constructor(private alertService: JhiAlertService,private toastrService: NbToastrService, private eventManager: JhiEventManager, private translateService: TranslateService) {
        /* tslint:enable */
        this.alerts = [];

        this.cleanHttpErrorListener = eventManager.subscribe('projectApp.httpError', response => {
            let i;
            const httpErrorResponse = response.content;
            switch (httpErrorResponse.status) {
                // connection refused, server not reachable
                case 0:
                    this.addErrorAlert('Server not reachable', 'error.server.not.reachable');
                    break;

                case 400:
                    const arr = httpErrorResponse.headers.keys();
                    let errorHeader = null;
                    let entityKey = null;
                    arr.forEach(entry => {
                        if (entry.toLowerCase().endsWith('app-error')) {
                            errorHeader = httpErrorResponse.headers.get(entry);
                        } else if (entry.toLowerCase().endsWith('app-params')) {
                            entityKey = httpErrorResponse.headers.get(entry);
                        }
                    });
                    if (errorHeader) {
                        const entityName = translateService.instant('global.menu.entities.' + entityKey);
                        this.addErrorAlert(errorHeader, errorHeader, { entityName });
                    } else if (httpErrorResponse.error !== '' && httpErrorResponse.error.fieldErrors) {
                      console.log(httpErrorResponse)
                      const fieldErrors = httpErrorResponse.error.fieldErrors;
                        for (i = 0; i < fieldErrors.length; i++) {
                            const fieldError = fieldErrors[i];
                            if (['Min', 'Max', 'DecimalMin', 'DecimalMax'].includes(fieldError.message)) {
                                fieldError.message = 'Size';
                            }
                            // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it
                            const convertedField = fieldError.field.replace(/\[\d*\]/g, '[]');
                            const fieldName = translateService.instant('projectApp.' + fieldError.objectName + '.' + convertedField);
                            this.addErrorAlert('Error on field "' + fieldName + '"', 'error.' + fieldError.message, { fieldName });
                        }
                    } else if (httpErrorResponse.error !== '' && httpErrorResponse.error.message) {
                        this.addErrorAlert(
                            httpErrorResponse.error.message,
                            httpErrorResponse.error.message,
                            httpErrorResponse.error.params
                        );
                    } else {
                        this.addErrorAlert(httpErrorResponse.error);
                    }
                    break;

                case 404:
                    this.addErrorAlert('Not found', 'error.url.not.found');
                    break;

                default:
                    if (httpErrorResponse.error !== '' && httpErrorResponse.error.message) {
                        this.addErrorAlert(httpErrorResponse.error.message);
                    } else {
                        this.addErrorAlert(httpErrorResponse.error);
                    }
            }
        });
    }

    ngOnDestroy() {
        if (this.cleanHttpErrorListener !== undefined && this.cleanHttpErrorListener !== null) {
            this.eventManager.destroy(this.cleanHttpErrorListener);
            this.alerts = [];
        }
    }

    addErrorAlert(message, key?, data?) {
        const newAlert: JhiAlert = {
            type: 'danger',
            msg: message,
            params: data,
            timeout: 5000,
            toast: this.alertService.isToast(),
            scoped: true
        };

        let alert=this.alertService.addAlert(newAlert, this.alerts);
      if(alert && alert.type && alert.msg){
        let status=alert.type as NbToastStatus;
        let position="bottom-right" as NbGlobalPosition;
        let duration=6000;
        this.toastrService.show(alert.msg, `ERREUR`,{ position , status , duration})
      }

    }
}
