import { Component, OnDestroy, OnInit } from '@angular/core';
import { JhiAlertService } from 'ng-jhipster';
import {NbGlobalPosition, NbToastrService} from "@nebular/theme";
import {NbToastStatus} from "@nebular/theme/components/toastr/model";

@Component({
    selector: 'jhi-alert',
    template: ``
})
export class JhiAlertComponent implements OnInit, OnDestroy {

    alerts: any[];

    constructor(private alertService: JhiAlertService,
                private toastrService: NbToastrService) {}

    ngOnInit() {
        this.alerts = this.alertService.get();
        for(let alert of this.alerts){
          if(alert && alert.type && alert.msg){
            let status=alert.type as NbToastStatus;
            let position="bottom-right" as NbGlobalPosition;
            let duration=6000;
            this.toastrService.show(alert.msg, alert.type.toUpperCase(),{ position , status , duration})
          }
        }
    }


    ngOnDestroy() {
        this.alerts = [];
    }
}
