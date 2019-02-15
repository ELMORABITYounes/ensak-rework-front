import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils} from 'ng-jhipster';

import { IEtudiant } from 'app/shared/model/etudiant.model';

import { ITEMS_PER_PAGE } from 'app/shared';
import { EtudiantService } from '../../../services/entities/etudiant.service';
import {AuthenticationService} from "../../../services/auth/authentication.service";

@Component({
    selector: 'jhi-etudiant',
    templateUrl: './etudiant.component.html'
})
export class EtudiantComponent implements OnInit, OnDestroy {
  currentAccount: string;
  etudiants: IEtudiant[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    loading:boolean=true;


  constructor(
        protected etudiantService: EtudiantService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected dataUtils: JhiDataUtils,
        protected authService: AuthenticationService
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

  setActive(etudiant:IEtudiant, isActivated) {
    etudiant.user.enabled = isActivated;

    this.etudiantService.update(etudiant).subscribe(response => {
      if (response.status === 200) {
        this.error = null;
        this.success = 'OK';
        this.loadAll();
      } else {
        this.success = null;
        this.error = 'ERROR';
      }
    });
  }

    loadAll() {
        this.etudiantService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IEtudiant[]>) => {
                  this.paginateEtudiants(res.body, res.headers)
                  this.loading=false;
                },
                    (res: HttpErrorResponse) => {
                      this.loading=false;
                      this.onError(res.message)
                }
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/pages/etudiants/etudiant'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/pages/etudiants/etudiant',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
      this.authService.getEmail().subscribe(email=>
      {
        this.currentAccount=email;
      });
        this.loadAll();
        this.registerChangeInEtudiants();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEtudiant) {
        return item.id;
    }

    registerChangeInEtudiants() {
        this.eventSubscriber = this.eventManager.subscribe('etudiantListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateEtudiants(data: IEtudiant[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.etudiants = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
}
