import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {DATE_TIME_FORMAT} from 'app/shared/constants/input.constants';

import {ISoutenance, Soutenance} from 'app/shared/model/soutenance.model';
import {IStage} from "../../../shared/model/stage.model";
import {StageService} from "../../../services/entities/stage.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {JhiAlertService} from "ng-jhipster";
import {MembreJury, RoleMembreJury} from "../../../shared/model/membre-jury.model";

@Component({
  selector: 'jhi-soutenance-update',
  templateUrl: './soutenance-update.component.html'
})
export class SoutenanceUpdateComponent implements OnInit {
  isSaving: boolean;
  stage: IStage;
  soutenanceForm: FormGroup;

  constructor(protected activatedRoute: ActivatedRoute,
              protected stageService: StageService,
              protected formBuilder: FormBuilder,
              protected jhiAlertService:JhiAlertService) {
  }

  ngOnInit() {
    this.isSaving = false;
    this.initForm();
    this.activatedRoute.data.subscribe(data => {
      this.stage=data.stage;
      let soutenance=data.soutenance;
      if(soutenance.id==null){
        (<Soutenance>soutenance).membresJuries[0]=new MembreJury(null,this.stage.professeurEncadrant.user.lastName,this.stage.professeurEncadrant.user.firstName,this.stage.professeurEncadrant.user.username,RoleMembreJury.ENCADRANT,null)
      }
      soutenance.date= soutenance.date != null ? soutenance.date.format(DATE_TIME_FORMAT) : null;
      let nbrMembers=soutenance.membresJuries.length;
      if(nbrMembers>3)
        for(let i=0;i<nbrMembers-3;i++)
          this.addMembre();
      this.soutenanceForm.setValue(soutenance);
    });
  }

  initForm() {
    this.soutenanceForm = this.formBuilder.group({
        id: [null],
        date: ["", [Validators.required]],
        membresJuries: this.formBuilder.array(this.initMembresJury())
      }
    )
  }

  initMembresJury() {
    let membresJury = [];
    for (let i = 0; i < 3; i++) {
      membresJury.push(this.formBuilder.group({
        id: [null],
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        email: ['', [Validators.required,Validators.email]],
        roleMembre: ['', Validators.required],
        soutenance: [null]
      }))
    }
    return membresJury
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    let date = moment(this.soutenanceForm.controls["date"].value, DATE_TIME_FORMAT);
    (<FormControl>this.soutenanceForm.controls["date"]).setValue(date);
    console.log(this.soutenanceForm.value)
    this.stage.soutenance = this.soutenanceForm.value
    this.stageService.update(this.stage).subscribe(res => this.onSaveSuccess(), err => this.onSaveError())
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISoutenance>>) {
    result.subscribe((res: HttpResponse<ISoutenance>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.jhiAlertService.success("Ajout/modification effectue correctement", null, null);
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  addMembre() {
    const control = <FormArray>this.soutenanceForm.controls['membresJuries'];
    control.push(this.formBuilder.group({
      id: [null],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      roleMembre: ['', Validators.required],
      soutenance: [null]
    }));
  }

  removeMembre(i: number) {
    const control = <FormArray>this.soutenanceForm.controls['membresJuries'];
    control.removeAt(i);
  }
}
