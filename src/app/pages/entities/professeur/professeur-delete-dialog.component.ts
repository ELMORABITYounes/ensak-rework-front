import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProfesseur } from 'app/shared/model/professeur.model';
import { ProfesseurService } from '../../../services/entities/professeur.service';

@Component({
    selector: 'jhi-professeur-delete-dialog',
    templateUrl: './professeur-delete-dialog.component.html'
})
export class ProfesseurDeleteDialogComponent {
    professeur: IProfesseur;

    constructor(
        protected professeurService: ProfesseurService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.professeurService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'professeurListModification',
                content: 'Deleted an professeur'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-professeur-delete-popup',
    template: ''
})
export class ProfesseurDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ professeur }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProfesseurDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.professeur = professeur;
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
