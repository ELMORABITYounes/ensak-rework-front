import {Component, OnInit} from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {JhiAlertService} from 'ng-jhipster';

import { IEtudiant } from 'app/shared/model/etudiant.model';
import { INiveau } from 'app/shared/model/niveau.model';
import * as XLSX from 'xlsx';
import {IListEtudiants, ListEtudiants} from "../../../shared/model/list-etudiants.model";
import {Ligne} from "../../../shared/model/ligne.model";
import {Router} from "@angular/router";
import {EtudiantService, NiveauService} from "../../../services/entities";

type AOA = any[][];

@Component({
    selector: 'jhi-etudiant-import',
    templateUrl: './etudiant-import.component.html'
})
export class EtudiantImportComponent implements OnInit {
    importList: IListEtudiants;
    isSaving: boolean;
    data: AOA;
    isFileValide:boolean;
    errorLignes:number[];
    numberOfEntries;
    niveaus: INiveau[];
  parsing:boolean;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected etudiantService: EtudiantService,
        protected niveauService: NiveauService,
        protected router:Router
    ) {}

    ngOnInit() {
      this.isSaving = false;
      this.isFileValide = false;
      this.parsing=true;
      this.errorLignes = [];
      this.importList=new ListEtudiants();
      this.importList.rows=[];
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
        console.log(this.importList)
        this.subscribeToSaveResponse(this.etudiantService.import(this.importList));
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEtudiant>>) {
        result.subscribe((res: HttpResponse<IEtudiant>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.jhiAlertService.success("les étudiant ont été importé correctement")
        this.router.navigateByUrl("/pages/etudiants/etudiant")
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    onFileChange(evt: any) {
      /* wire up file reader */
      const target: DataTransfer = <DataTransfer>(evt.target);
      if (target.files.length !== 1) throw new Error('Cannot use multiple files');
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

        const wsname: string = wb.SheetNames[0];
        /* grab first sheet */
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
        this.init()
        this.data.forEach((item:any[], index) => {
          if(item.length!=0 && index!=0)
            this.parseRow(item,index);
        })
        console.log(this.numberOfEntries)
        console.log(this.importList.rows.length)
        if(this.importList.rows.length==0 || this.importList.rows.length!=this.numberOfEntries){
          this.isFileValide=false
        }else{
          this.isFileValide=true
        }
        this.parsing=false
      };
      reader.readAsBinaryString(target.files[0]);
    }

  init(){
    this.parsing=true
    this.errorLignes=[];
    this.importList.rows=[]
    this.numberOfEntries=0
  }
    
    parseRow(row:any[],index:number){
      let cne=row[1];
      if ( cne != null && cne>=1000000000 && cne<=9999999999 ){
        let nom=row[2];
        if(nom != null && nom!==""){
          let prenom=row[3];
          if(prenom!=null && prenom!==""){
            let email=row[4];
            if(email!=null && email!==""){
              let tel=row[5];
              if(tel!=null && tel!==""){
                this.importList.rows.push(new Ligne(prenom,nom,email,cne,tel));
                this.numberOfEntries++
                return;
              }
            }
          }
        }
      }
      this.errorLignes.push(index+1)
    }
}
