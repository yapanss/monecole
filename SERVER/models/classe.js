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
  educateur: String,
  enseignements: [{
    matiere: String,
    codeProf: String,
    coefficient: Number
  }],
  chefDeClasse: String,
  pp: String,
});

module.exports = mongoose.model('Classe', classeSchema)
