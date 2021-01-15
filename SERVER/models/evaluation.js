const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  annee: String,
  periode: String,
  eleve: String,
  evaluateur: String,
  matiere: String,
  note: Number,
  coefficient: Number
});

module.exports = mongoose.model('Evaluation', evaluationSchema)
