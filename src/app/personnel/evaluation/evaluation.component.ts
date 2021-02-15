import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit, OnChanges {
  aujourdhui: number = Date.now();
  anneeScolaire: string;
  moyennePassage: number;
  moyenneRedoublement: number;
  periodesEvaluation: any[];
  periodes: string[];
  periode: string;
  eleves: any[];
  classes: any[];
  nomsDesClasses: string[];
  nomClasse: string;
  classe = {};
  matieres: string[];
  matiere: string;
  coefficient: number;
  listeNotes: number[] = [];
  listeRang;
  moyennes: number[] = [];
  moyennesTries: number[] = [];
  absences: number[] = [];

	@Input() personnel: any;
  rangs: any[];
  constructor(private configService: ConfigService,
              private api: ApiService,
              private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }
  ngOnChanges(): void{
    this.periodes = this.configService.getPeriodes().concat(['Annuel']);
    this.periodesEvaluation = this.configService.config.periodesEvaluation;
    Object.keys(this.periodesEvaluation).forEach(periode =>{
      this.periodesEvaluation[periode] = {
        debut: this.configService.config.periodesEvaluation[periode].debut ? Date.parse((this.configService.config.periodesEvaluation[periode].debut).toString()) : null,
        fin: this.configService.config.periodesEvaluation[periode].fin ? Date.parse((this.configService.config.periodesEvaluation[periode].fin).toString()) : null
      }
    })
    this.anneeScolaire = this.configService.config.anneeScolaire;
    this.moyennePassage = this.configService.config.moyennePassage;
    this.moyenneRedoublement = this.configService.config.moyenneRedoublement;
    if(this.personnel && this.personnel.fonction){
      if(this.personnel.fonction.titre == 'Professeur' || this.personnel.fonction.titre == 'Educateur(trice)'){
        this.api.getSome('classe', 'prof', this.personnel.code, this.anneeScolaire)
        .subscribe(classes => {
          this.classes = classes;
          this.nomsDesClasses = this.determineNomsDesClasse(this.classes)
        })
      }
    }
  }
  onSelectClasse(): void {
    this.classe = this.determineClasseParNom(this.nomClasse);
    this.matieres = this.determineMatieres(this.personnel.code, this.classe)
  }
  generateEleves(){
    if(this.eleves){
      return of(this.eleves)
    }
    else{
      return this.api.getSome('eleve', 'classe', this.nomClasse, this.anneeScolaire)
    }
  }
  onGenerate(){
    this.generateEleves()
    .subscribe(eleves => {
      this.eleves = _.sortBy(eleves, 'nom')
      this.eleves.forEach(eleve =>{
        eleve.cursus.forEach(cursusItem =>{
          if(cursusItem.annee == this.anneeScolaire){
            if(cursusItem.resultats == undefined){
              cursusItem.resultats = {Annuel: {}}
              const periodes = this.configService.getPeriodeEtCoef()
              periodes.forEach(periode =>{
                cursusItem.resultats[periode.titre] = {
                  coefficient: periode.coefficient,
                  moyenne: null,
                  distinction: null,
                  rang: null
                }
              })
            }
          }
        })
      })
      this.collectionneMoyennesPeriode()
      this.collectionneRangsPeriode(this.eleves)
      this.collectionneAbsencesPeriode()
    })
  }
  onSubmit(){
    let listeMoyenneAnnuelleMatiere = [];
    let listeMoyenneGlePeriode = [];
    let listeMoyenneGleAnnuelle = [];

    const notesMatiereTries = this.trieMoyennes(this.moyennes)
    const listeRangMatiere = this.rangeNotes(notesMatiereTries)
    const minMatiere = notesMatiereTries[notesMatiereTries.length-1]
    const maxMatiere = notesMatiereTries[0]
    let i = 0;
    const classe = this.determineClasseParNom(this.nomClasse);
    const enseignement = this.determineEnseignement(classe, this.matiere);
    const coefficient = this.determineCoefficient(enseignement);
    this.eleves.forEach(eleve =>{
      eleve.cursus.forEach(cursusItem =>{
        if(cursusItem.annee == this.anneeScolaire){
          let note = this.moyennes[i];
          let rang = listeRangMatiere[note];
          let appreciation = this.attribueAppreciation(note)
          this.attribueInfoPeriodeMatiere(cursusItem, note, coefficient, rang, this.periode, minMatiere, maxMatiere, appreciation);
          let moyenneAnnuelleMatiere = this.calculeMoyenneAnnuelleMatiere(cursusItem);
          this.attribueMoyenneAnnuelleMatiere(cursusItem, moyenneAnnuelleMatiere);
          listeMoyenneAnnuelleMatiere.push(moyenneAnnuelleMatiere);
          let moyenneGlePeriode = this.calculeMoyenneGlePeriode(cursusItem, this.periode);
          this.attribueMoyenneGle(cursusItem, this.periode, moyenneGlePeriode);
          listeMoyenneGlePeriode.push(moyenneGlePeriode);
          let moyenneGleAnnuelle = this.caculeMoyenneGleAnnuelle(cursusItem);
          this.attribueMoyenneGle(cursusItem, 'Annuel', moyenneGleAnnuelle);
          listeMoyenneGleAnnuelle.push(moyenneGleAnnuelle);
          this.attribueDecisionFinAnnee(cursusItem);
          if(this.personnel.fonction.titre == 'Educateur(trice)'){
            this.attribueAbsenceParEleve(cursusItem, this.absences[i]);
          }
        }
      })
      i = i + 1;
    })
    const notesAnnuelleMatiereTries = this.trieMoyennes(listeMoyenneAnnuelleMatiere)
    const notesGlePeriodeTries = this.trieMoyennes(listeMoyenneGlePeriode)
    const notesGleAnnuelleTries = this.trieMoyennes(listeMoyenneGleAnnuelle)
    const listeRangAnnuelMatiere = this.rangeNotes(notesAnnuelleMatiereTries)
    const listeRangGlePeriode = this.rangeNotes(notesGlePeriodeTries)
    const listeRangGleAnnuel = this.rangeNotes(notesGleAnnuelleTries)
    const minAnnuelMatiere = notesAnnuelleMatiereTries[notesAnnuelleMatiereTries.length-1]
    const minGlePeriode = notesGlePeriodeTries[notesGlePeriodeTries.length-1]
    const minGleAnnuel = notesGleAnnuelleTries[notesGleAnnuelleTries.length-1]
    const maxAnnuelMatiere = notesAnnuelleMatiereTries[0]
    const maxGlePeriode = notesGlePeriodeTries[0]
    const maxGleAnnuel = notesGleAnnuelleTries[0]
    let j = 0;

    this.eleves.forEach(eleve =>{
      eleve.cursus.forEach(cursusItem  =>{
        if(cursusItem.annee == this.anneeScolaire){
          const moyAnnMatiere = cursusItem.resultats['Annuel'][this.matiere]['note'];
          const moyGlePeriode = cursusItem.resultats[this.periode]['moyenne'];
          const moyGleAnnuel = cursusItem.resultats['Annuel']['moyenne'];

          cursusItem.resultats['Annuel'][this.matiere]['min'] = minAnnuelMatiere
          cursusItem.resultats['Annuel'][this.matiere]['max'] = maxAnnuelMatiere
          cursusItem.resultats['Annuel'][this.matiere]['rang'] = listeRangAnnuelMatiere[moyAnnMatiere]
          cursusItem.resultats['Annuel'][this.matiere]['nomEvaluateur'] = this.personnel.nom + this.personnel.prenoms;

          cursusItem.resultats[this.periode]['min'] = minGlePeriode
          cursusItem.resultats[this.periode]['max'] = maxGlePeriode
          cursusItem.resultats[this.periode]['rang'] = listeRangGlePeriode[moyGlePeriode]

          cursusItem.resultats['Annuel']['min'] = minGleAnnuel
          cursusItem.resultats['Annuel']['max'] = maxGleAnnuel
          cursusItem.resultats['Annuel']['rang'] = listeRangGleAnnuel[moyGleAnnuel]

          cursusItem.resultats[this.periode]['distinction'] = this.attribueDistinction(moyGlePeriode)
        }
      })
    })
    
    let body = {
      eleves: this.eleves,
      classe: this.nomClasse,
      updateQuery: 'resultats',
      anneeScolaire: this.anneeScolaire
    }
    this.api.updateItems('eleve', body)
    .subscribe(response =>{
        console.log('response = ', response)
        this.openSaveSnackBar()
        this.collectionneRangsPeriode(response) 
    })
  }


  determineMatieres(codeProf: string, classe: any){
    return classe.enseignements.filter(enseignement => enseignement.codeProf == codeProf)
                               .map(enseignement => enseignement.matiere);
  }
  determineNomsDesClasse(classes: any){
    return classes.map(classe => classe.nom)
  }
  determineClasseParNom(nomDeClasse){
    return this.classes.filter(classe => classe.nom == nomDeClasse)[0]
  }
  determineEnseignement(classe, matiere: string){
    return classe.enseignements.filter(enseignement => enseignement.matiere == matiere)[0]
  }
  determineCoefficient(enseignement){
    const coef = enseignement['coefficient'];
    return coef;
  }
  collectionneMoyennesPeriode(){
    this.moyennes = []
    this.eleves.forEach(eleve => {
      eleve.cursus.forEach(item =>{
        if(item.annee == this.anneeScolaire){
          if(item.resultats && item.resultats[this.periode] && item.resultats[this.periode][this.matiere] != undefined){
            this.moyennes.push(item.resultats[this.periode][this.matiere]['note'])
          }else{
            this.moyennes.push(null)
          }
        }
      })
    });
  }
  collectionneRangsPeriode(eleves){
    this.rangs = []
    eleves.forEach(eleve => {
      eleve.cursus.forEach(item =>{
        if(item.annee == this.anneeScolaire){
          if(item.resultats && item.resultats[this.periode] && item.resultats[this.periode][this.matiere] != undefined){
            this.rangs.push(item.resultats[this.periode][this.matiere]['rang'])
          }else{
            this.rangs.push(null)
          }
        }
      })
    });
  }
  collectionneAbsencesPeriode(){
    this.eleves.forEach(eleve => {
      eleve.cursus.forEach(item =>{
        if(item.annee == this.anneeScolaire){
          if(item.resultats && item.resultats[this.periode] && item.resultats[this.periode]['nbrAbsence'] != null){
            this.absences.push(item.resultats[this.periode]['nbrAbsence'])
          }else{
            this.absences.push(null)
          }
        }
      })
    });
  }
  attribueInfoPeriodeMatiere(cursusItem: any, note: number, coefficient: number, 
                                rang: number, periode: string, min: number, 
                                max: number, appreciation: string){
    const nomEvaluateur = this.personnel.nom + ' ' + this.personnel.prenoms;
        if(cursusItem.resultats && cursusItem.resultats[periode]){
          cursusItem.resultats[periode][this.matiere] = {note, coefficient, rang, min, max, nomEvaluateur, appreciation};
        }else if(cursusItem.resultats && !cursusItem.resultats[periode]){
          cursusItem.resultats[periode] = {
            [this.matiere]: {note, coefficient, rang, min, max, nomEvaluateur, appreciation}
          };
        }else{
          cursusItem.resultats = {
            [periode]: {
              [this.matiere]: {note, coefficient, rang, min, max, nomEvaluateur, appreciation}
            }
          }
        }
  }
  attribueMoyenneAnnuelleMatiere(cursusItem: any, note: number){
    const nomEvaluateur = this.personnel.nom + ' ' + this.personnel.prenoms;
        if(cursusItem.resultats && cursusItem.resultats['Annuel']){
          cursusItem.resultats['Annuel'][this.matiere] = {note, nomEvaluateur};
        }else if(cursusItem.resultats && !cursusItem.resultats['Annuel']){
          cursusItem.resultats['Annuel'] = {
            [this.matiere]: {note, nomEvaluateur}
          };
        }else{
          cursusItem.resultats = {
            ['Annuel']: {
              [this.matiere]: {note, nomEvaluateur}
            }
          }
        }
  }
  attribueAbsenceParEleve(cursusItem, nbrAbsence: number){
      if(cursusItem.resultats && cursusItem.resultats[this.periode]){
        cursusItem.resultats[this.periode]['nbrAbsence'] = nbrAbsence;
      }else if(cursusItem.resultats && !cursusItem.resultats[this.periode]){
        cursusItem.resultats[this.periode] = {
          ['nbrAbsence']: nbrAbsence 
        };
      }else{
        cursusItem.resultats = {
          [this.periode]: {
            ['nbrAbsence']: nbrAbsence
          }
        }
      }
  }
  attribueMoyenneGle(cursusItem: any, periode: string, moyenne: number){
    cursusItem.resultats[periode]['moyenne'] = moyenne
  }
  calculeMoyenneGlePeriode(cursusItem:any, periode: string){
    let moyennesMatieres;
    let total = 0;
    let sommeCoef = 0;
    moyennesMatieres = Object.entries(cursusItem.resultats[periode])
                            .filter(item => {
                              return item[0] != 'nbrAbsence' &&  
                                     item[0] != 'moyenne' && 
                                     item[0] != 'coefficient' &&
                                     item[0] != 'distinction' &&
                                     item[0] != 'rang'
                            })
    moyennesMatieres.forEach(item =>{
      if(item[1]['note'] != null){
        let note = item[1]['note'];
        let coef = item[1]['coefficient'];
        total = total + note*coef;
        sommeCoef = sommeCoef + coef;
      }
    })
    
    return sommeCoef != 0 ? total/sommeCoef : null;
  }
  calculeMoyenneAnnuelleMatiere(cursusItem: any){
    let total = 0;
    let sommeCoef = 0;
    // let donneeAnneeEnCoursCursus = eleve.cursus.filter(item => item.annee = this.anneeScolaire)
        this.periodes.forEach(periode =>{
          if(periode != 'Annuel'){
            if(cursusItem.resultats[periode][this.matiere] && 
                cursusItem.resultats[periode][this.matiere]['note'] != null){
              let moyennePeriodeMatiere = cursusItem.resultats[periode][this.matiere]['note']
              let coefPeriode = cursusItem.resultats[periode].coefficient
              console.log('coef periode : ', coefPeriode)
              total = total + moyennePeriodeMatiere*coefPeriode
              sommeCoef = sommeCoef + coefPeriode
            }
          }
        })
      return sommeCoef != 0 ? total/sommeCoef : null
  }
  caculeMoyenneGleAnnuelle(cursusItem){
    let total = 0;
    let sommeCoef = 0;
    this.periodes.forEach(periode =>{
      if(periode != 'Annuel'){
        console.log('periode : ', periode)
        console.log('Moyenne ', periode,' === ', cursusItem.resultats[periode].moyenne)
        if(cursusItem.resultats[periode].moyenne != null){
          let moyennePeriode = cursusItem.resultats[periode].moyenne
          let coefPeriode = cursusItem.resultats[periode].coefficient
          total = total + moyennePeriode*coefPeriode
          sommeCoef = sommeCoef + coefPeriode
        }
      }
    })
    return sommeCoef != 0 ? total/sommeCoef: null;
  }
  trieMoyennes(moyennes): number[]{
    return moyennes.map(moyenne => moyenne)
                  .sort((a: number, b: number) => b-a)
  }
  rangeNotes(moyennesTries: number[]): any{
    let listeRang = {};
    for(let i=0; i<moyennesTries.length; i++){
      if(i==0){
        listeRang[moyennesTries[0]]=1
      }else if(moyennesTries[i] != moyennesTries[i-1]){
        listeRang[moyennesTries[i]] = i+1
      }
    }
    return listeRang
  }
  attribueDecisionFinAnnee(cursusItem){
        let moyenneGleAnnuelle = cursusItem.resultats['Annuel'].moyenne 
        if(moyenneGleAnnuelle >= this.moyennePassage){
          cursusItem.decisionFinAnnee = 'Admis (e)'
        } else if(moyenneGleAnnuelle >= this.moyenneRedoublement && moyenneGleAnnuelle < this.moyennePassage){
          cursusItem.decisionFinAnnee = 'Redouble'
        } else{
          cursusItem.decisionFinAnnee = 'Exclu (e)'
        }
  }
  attribueAppreciation(moyenne){
    if(moyenne < 7){
      return 'Travail médiocre'
    }else if(moyenne < 8.5 && moyenne >= 7){
      return 'Très Insuffisant'
    }else if(moyenne < 10 && moyenne >= 8.5){
      return 'Insuffisant'
    }else if(moyenne < 12 && moyenne >= 10){
      return 'Passable'
    }else if(moyenne >= 12 && moyenne < 14){
      return 'Assez Bien'
    }else if(moyenne >= 14 && moyenne < 16){
      return 'Bien'
    }else if(moyenne >= 16 && moyenne < 18){
      return 'Très Bien'
    }else if(moyenne >= 18){
      return 'Excellent'
    }
  }
  attribueDistinction(moyenne){
    // let distinction;
    if(moyenne < 8.5){
      return 'BT'
    }else if(moyenne < 9 && moyenne >= 8.5){
      return 'AVT'
    }else if(moyenne >= 12 && moyenne < 13){
      return 'TH'
    }else if(moyenne >= 13 && moyenne < 14){
      return 'THE'
    }else if(moyenne >= 14){
      return 'THF'
    }else return null
  }
  openSaveSnackBar(){
    const snackbarRef = this.snackbar.open('Notes enregistrées', 'close', {})
  }
}

// {}<>
