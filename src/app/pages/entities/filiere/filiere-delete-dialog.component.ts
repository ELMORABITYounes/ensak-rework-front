import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFiliere } from 'app/shared/model/filiere.model';
import { FiliereService } from '../../../services/entities/filiere.service';

@Component({
    selector: 'jhi-filiere-delete-dialog',
    templateUrl: './filiere-delete-dialog.component.html'
})
export class FiliereDeleteDialogComponent {
    filiere: IFiliere;

    constructor(protected filiereService: FiliereService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.filiereService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'filiereListModification',
                content: 'Deleted an filiere'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-filiere-delete-popup',
    template: ''
})
export class FiliereDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ filiere }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FiliereDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.filiere = filiere;
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
