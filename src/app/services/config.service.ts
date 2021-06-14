import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
	ecole;
  constructor() { }
  getMatieresEtCoef(niveauClasse) {
  	return this.ecole.niveaux.filter(niveau => {
		return niveau.niveau == niveauClasse
	})
	.map(item => item.matieres)[0]
	.map(item => Object.values(item))
  }

  getMatieres(niveauClasse) {
  	return this.getMatieresEtCoef(niveauClasse)
  			.map(item => item[1])
  }
  getClasses(niveauClasse) {
  	return this.ecole.niveaux.filter(niveau => {
		return niveau.niveau == niveauClasse
	})
	.map(item => item.classes)[0]
  }
  getSalles() {
  	return this.ecole.salles
  }
  getCodes() {
  	return this.ecole.codesProfesseur
  }
  getCodeProf(classe, matiere) {
    return classe.enseignements.filter(enseignement => enseignement.matiere == matiere)
                                .map(enseignement => enseignement.codeProf)[0]
  }
  getPeriodes() {
    return this.ecole.periodes.map(periode => periode.titre)
  }
  getPeriodeEtCoef(){
    return this.ecole.periodes
  }
  getNiveaux(){
    return this.ecole.niveaux.map(niveau => niveau.niveau)
  }
  getAnneeSuivante(){
    let [debut, fin] = this.ecole.anneeScolaire.split('-')
        debut = fin
        fin = (parseInt(fin)+1).toString()
        return debut+"-"+fin
  }
}


