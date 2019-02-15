import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISoutenance } from 'app/shared/model/soutenance.model';
import { SoutenanceService } from '../../../services/entities/soutenance.service';

@Component({
    selector: 'jhi-soutenance-delete-dialog',
    templateUrl: './soutenance-delete-dialog.component.html'
})
export class SoutenanceDeleteDialogComponent {
    soutenance: ISoutenance;

    constructor(
        protected soutenanceService: SoutenanceService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.soutenanceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'soutenanceListModification',
                content: 'Deleted an soutenance'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-soutenance-delete-popup',
    template: ''
})
export class SoutenanceDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ soutenance }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SoutenanceDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.soutenance = soutenance;
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
