import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMembreJury } from 'app/shared/model/membre-jury.model';
import { MembreJuryService } from '../../../services/entities/membre-jury.service';

@Component({
    selector: 'jhi-membre-jury-delete-dialog',
    templateUrl: './membre-jury-delete-dialog.component.html'
})
export class MembreJuryDeleteDialogComponent {
    membreJury: IMembreJury;

    constructor(
        protected membreJuryService: MembreJuryService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.membreJuryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'membreJuryListModification',
                content: 'Deleted an membreJury'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-membre-jury-delete-popup',
    template: ''
})
export class MembreJuryDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ membreJury }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MembreJuryDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.membreJury = membreJury;
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
