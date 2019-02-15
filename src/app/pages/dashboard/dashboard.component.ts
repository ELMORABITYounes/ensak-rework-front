import {Component, OnInit} from '@angular/core';
import {
  EtudiantService,
  FiliereService,
  ModuleService,
  ProfesseurService,
  SocieteService,
  StageService
} from "../../services/entities";

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit{
  nbrFilieres:number=0;
  nbrEtudiants:number=0;
  nbrProfesseurs:number=0;
  nbrStages:number=0;
  nbrSocietes:number=0;
  nbrModules:number=0;

  constructor(private etudiantService:EtudiantService,
              private professeeurService:ProfesseurService,
              private moduleService:ModuleService,
              private stageService:StageService,
              private societeService:SocieteService,
              private filiereService:FiliereService,
  ){

  }

  ngOnInit(): void {
    this.etudiantService.count().subscribe(res=>
      this.nbrEtudiants=res
    )
    this.professeeurService.count().subscribe(res=>
      this.nbrProfesseurs=res
    )

    this.societeService.count().subscribe(res=>
      this.nbrSocietes=res
    )
    this.stageService.count().subscribe(res=>
      this.nbrStages=res
    )
    this.moduleService.count().subscribe(res=>
      this.nbrModules=res
    )
    this.filiereService.count().subscribe(res=>
      this.nbrFilieres=res
    )
  }


}
