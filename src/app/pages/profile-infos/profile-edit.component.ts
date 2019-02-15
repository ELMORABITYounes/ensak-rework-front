import {Component, ElementRef, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/auth/authentication.service";
import {IDepartement} from "../../shared/model/departement.model";
import {JhiAlertService, JhiDataUtils} from "ng-jhipster";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {INiveau} from "../../shared/model/niveau.model";
import {IProfile, Profile} from "../../shared/model/profile.model";
import {ActivatedRoute} from "@angular/router";
import {DepartementService, EtudiantService, NiveauService, ProfesseurService} from "../../services/entities";

@Component({
  selector: 'profile-edit',
  templateUrl: './profile-edit.component.html'
})
export class ProfileEditComponent implements OnInit{

  profile:IProfile=new Profile();
  isSaving: boolean;
  departements: IDepartement[];
  niveaus:INiveau[];

  constructor(
    protected elementRef: ElementRef,
    protected jhiAlertService: JhiAlertService,
    protected activatedRoute: ActivatedRoute,
    protected departementService: DepartementService,
    protected dataUtils: JhiDataUtils,
    protected authService: AuthenticationService,
    protected niveauService: NiveauService,
    protected etudiantService:EtudiantService,
    protected professeurService : ProfesseurService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({profile}) => {
      this.profile = profile;
    });
    this.isSaving = false;
    if (this.authService.hasAnyAuthority(["ROLE_TEACHER"]))
    this.departementService.query().subscribe(
      (res: HttpResponse<IDepartement[]>) => {
        this.departements = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    if (this.authService.hasAnyAuthority(["ROLE_STUDENT"]))
      this.niveauService.query().subscribe(
      (res: HttpResponse<INiveau[]>) => {
        this.niveaus = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    if (this.authService.hasAnyAuthority(["ROLE_TEACHER"]))
      this.subscribeToSaveResponse(this.professeurService.update(this.profile));
    else
      this.subscribeToSaveResponse(this.etudiantService.update(this.profile));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfile>>) {
    result.subscribe((res: HttpResponse<IProfile>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess(profile:IProfile) {
    this.authService.setImageProfile(profile);
    this.authService.reloadToken();
    this.isSaving = false;
    this.jhiAlertService.success("vos informations ont ete mis a jour correctement", null, null);
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackDepartementById(index: number, item: IDepartement) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, entity, field, isImage) {
    this.dataUtils.setFileData(event, entity, field, isImage);
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string) {
    this.dataUtils.clearInputImage(this.profile, this.elementRef, field, fieldContentType, idInput);
  }

}
