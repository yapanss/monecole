const mongoose = require('mongoose');

const emploiClasseSchema = new mongoose.Schema({
	classe: String,
	lundi: {
      m1: {matiere: String, salle: String, codeProf: String},
      m2: {matiere: String, salle: String, codeProf: String},
      m3: {matiere: String, salle: String, codeProf: String},
      m4: {matiere: String, salle: String, codeProf: String},
      m5: {matiere: String, salle: String, codeProf: String},
      s1: {matiere: String, salle: String, codeProf: String},
      s2: {matiere: String, salle: String, codeProf: String},
      s3: {matiere: String, salle: String, codeProf: String},
      s4: {matiere: String, salle: String, codeProf: String},
      s5: {matiere: String, salle: String, codeProf: String}
  },
  mardi: {
      m1: {matiere: String, salle: String, codeProf: String},
      m2: {matiere: String, salle: String, codeProf: String},
      m3: {matiere: String, salle: String, codeProf: String},
      m4: {matiere: String, salle: String, codeProf: String},
      m5: {matiere: String, salle: String, codeProf: String},
      s1: {matiere: String, salle: String, codeProf: String},
      s2: {matiere: String, salle: String, codeProf: String},
      s3: {matiere: String, salle: String, codeProf: String},
      s4: {matiere: String, salle: String, codeProf: String},
      s5: {matiere: String, salle: String, codeProf: String}
  },
  mercredi: {
      m1: {matiere: String, salle: String, codeProf: String},
      m2: {matiere: String, salle: String, codeProf: String},
      m3: {matiere: String, salle: String, codeProf: String},
      m4: {matiere: String, salle: String, codeProf: String},
      m5: {matiere: String, salle: String, codeProf: String},
      s1: {matiere: String, salle: String, codeProf: String},
      s2: {matiere: String, salle: String, codeProf: String},
      s3: {matiere: String, salle: String, codeProf: String},
      s4: {matiere: String, salle: String, codeProf: String},
      s5: {matiere: String, salle: String, codeProf: String}
  },
  jeudi: {
      m1: {matiere: String, salle: String, codeProf: String},
      m2: {matiere: String, salle: String, codeProf: String},
      m3: {matiere: String, salle: String, codeProf: String},
      m4: {matiere: String, salle: String, codeProf: String},
      m5: {matiere: String, salle: String, codeProf: String},
      s1: {matiere: String, salle: String, codeProf: String},
      s2: {matiere: String, salle: String, codeProf: String},
      s3: {matiere: String, salle: String, codeProf: String},
      s4: {matiere: String, salle: String, codeProf: String},
      s5: {matiere: String, salle: String, codeProf: String}
  },
  vendredi: {
      m1: {matiere: String, salle: String, codeProf: String},
      m2: {matiere: String, salle: String, codeProf: String},
      m3: {matiere: String, salle: String, codeProf: String},
      m4: {matiere: String, salle: String, codeProf: String},
      m5: {matiere: String, salle: String, codeProf: String},
      s1: {matiere: String, salle: String, codeProf: String},
      s2: {matiere: String, salle: String, codeProf: String},
      s3: {matiere: String, salle: String, codeProf: String},
      s4: {matiere: String, salle: String, codeProf: String},
      s5: {matiere: String, salle: String, codeProf: String}
  }
})

module.exports = mongoose.model('EmploiClasse', emploiClasseSchema); 