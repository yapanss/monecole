const mongoose = require('mongoose');

const classeSchema = new mongoose.Schema({
  anneeScolaire: String,
  niveau: String,
  niveauSuivant: String,
  nom: String,
  salle: String,
  effectif: Number,
  lv2: String,
  art: String,
  enseignements: [{
    matiere: String,
    codeProf: String,
    matriculeProf: String,
    nomProf: String,
    coefficient: Number
  }],
  encadrements: [{
    titreEncadreur: String,
    matriculeEncadreur: String,
    nomEncadreur: String
  }],
  delegues: [{
    titreDelegue: String,
    matriculeDelegue: String,
    nomDelegue: String
  }]
});

module.exports = mongoose.model('Classe', classeSchema)
