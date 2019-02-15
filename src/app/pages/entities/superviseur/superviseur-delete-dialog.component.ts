import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISuperviseur } from 'app/shared/model/superviseur.model';
import { SuperviseurService } from '../../../services/entities/superviseur.service';

@Component({
    selector: 'jhi-superviseur-delete-dialog',
    templateUrl: './superviseur-delete-dialog.component.html'
})
export class SuperviseurDeleteDialogComponent {
    superviseur: ISuperviseur;

    constructor(
        protected superviseurService: SuperviseurService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.superviseurService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'superviseurListModification',
                content: 'Deleted an superviseur'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-superviseur-delete-popup',
    template: ''
})
export class SuperviseurDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ superviseur }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SuperviseurDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.superviseur = superviseur;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
