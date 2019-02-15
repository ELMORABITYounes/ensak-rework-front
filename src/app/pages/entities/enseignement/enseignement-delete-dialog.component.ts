import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEnseignement } from 'app/shared/model/enseignement.model';
import { EnseignementService } from '../../../services/entities/enseignement.service';

@Component({
    selector: 'jhi-enseignement-delete-dialog',
    templateUrl: './enseignement-delete-dialog.component.html'
})
export class EnseignementDeleteDialogComponent {
    enseignement: IEnseignement;

    constructor(
        protected enseignementService: EnseignementService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.enseignementService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'enseignementListModification',
                content: 'Deleted an enseignement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-enseignement-delete-popup',
    template: ''
})
export class EnseignementDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ enseignement }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EnseignementDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.enseignement = enseignement;
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
