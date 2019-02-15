import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils} from 'ng-jhipster';

import { IProfesseur } from 'app/shared/model/professeur.model';

import { ITEMS_PER_PAGE } from 'app/shared';
import { ProfesseurService } from '../../../services/entities/professeur.service';
import {AuthenticationService} from "../../../services/auth/authentication.service";

@Component({
    selector: 'jhi-professeur',
    templateUrl: './professeur.component.html'
})
export class ProfesseurComponent implements OnInit, OnDestroy {
  currentAccount: string;
  professeurs: IProfesseur[];
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
      protected authService: AuthenticationService,
      protected professeurService: ProfesseurService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected dataUtils: JhiDataUtils,

    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

  setActive(professeur:IProfesseur, isActivated) {
    professeur.user.enabled = isActivated;

    this.professeurService.update(professeur).subscribe(response => {
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
        this.professeurService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IProfesseur[]>) => {
                  this.paginateProfesseurs(res.body, res.headers)
                this.loading=false},
                    (res: HttpErrorResponse) => {
                  this.onError(res.message)
                      this.loading=false;
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
        this.router.navigate(['/pages/professeurs/professeur'], {
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
            '/pages/professeurs/professeur',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
      this.authService.getEmail().subscribe(email=>
        this.currentAccount=email
      );

      this.loadAll();
      this.registerChangeInProfesseurs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProfesseur) {
        return item.id;
    }

    registerChangeInProfesseurs() {
        this.eventSubscriber = this.eventManager.subscribe('professeurListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateProfesseurs(data: IProfesseur[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.professeurs = data;
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
