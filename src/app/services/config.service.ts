import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
	config;
  constructor() { }
  getMatieresEtCoef(niveauClasse) {
  	return this.config.niveaux.filter(niveau => {
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
  	return this.config.niveaux.filter(niveau => {
		return niveau.niveau == niveauClasse
	})
	.map(item => item.classes)[0]
  }
  getSalles() {
  	return this.config.salles
  }
  getCodes() {
  	return this.config.codesProfesseur
  }
  getCodeProf(classe, matiere) {
    return classe.enseignements.filter(enseignement => enseignement.matiere == matiere)
                                .map(enseignement => enseignement.codeProf)[0]
  }
  getPeriodes() {
    return this.config.periodes.map(periode => periode.titre)
  }
  getPeriodeEtCoef(){
    return this.config.periodes
  }
  getNiveaux(){
    return this.config.niveaux.map(niveau => niveau.niveau)
  }
  getAnneeSuivante(){
    let [debut, fin] = this.config.anneeScolaire.split('-')
        debut = fin
        fin = (parseInt(fin)+1).toString()
        return debut+"-"+fin
  }
}


