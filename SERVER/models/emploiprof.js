const mongoose = require('mongoose');

const emploiProfSchema = new mongoose.Schema({
	codeProf: String,
	lundi: {
      m1: {matiere: String, salle: String},
      m2: {matiere: String, salle: String},
      m3: {matiere: String, salle: String},
      m4: {matiere: String, salle: String},
      m5: {matiere: String, salle: String},
      s1: {matiere: String, salle: String},
      s2: {matiere: String, salle: String},
      s3: {matiere: String, salle: String},
      s4: {matiere: String, salle: String},
      s5: {matiere: String, salle: String}
    },
    mardi: {
      m1: {matiere: String, salle: String},
      m2: {matiere: String, salle: String},
      m3: {matiere: String, salle: String},
      m4: {matiere: String, salle: String},
      m5: {matiere: String, salle: String},
      s1: {matiere: String, salle: String},
      s2: {matiere: String, salle: String},
      s3: {matiere: String, salle: String},
      s4: {matiere: String, salle: String},
      s5: {matiere: String, salle: String}
    },
    mercredi: {
      m1: {matiere: String, salle: String},
      m2: {matiere: String, salle: String},
      m3: {matiere: String, salle: String},
      m4: {matiere: String, salle: String},
      m5: {matiere: String, salle: String},
      s1: {matiere: String, salle: String},
      s2: {matiere: String, salle: String},
      s3: {matiere: String, salle: String},
      s4: {matiere: String, salle: String},
      s5: {matiere: String, salle: String}
    },
    jeudi: {
      m1: {matiere: String, salle: String},
      m2: {matiere: String, salle: String},
      m3: {matiere: String, salle: String},
      m4: {matiere: String, salle: String},
      m5: {matiere: String, salle: String},
      s1: {matiere: String, salle: String},
      s2: {matiere: String, salle: String},
      s3: {matiere: String, salle: String},
      s4: {matiere: String, salle: String},
      s5: {matiere: String, salle: String}
    },
    vendredi: {
      m1: {matiere: String, salle: String},
      m2: {matiere: String, salle: String},
      m3: {matiere: String, salle: String},
      m4: {matiere: String, salle: String},
      m5: {matiere: String, salle: String},
      s1: {matiere: String, salle: String},
      s2: {matiere: String, salle: String},
      s3: {matiere: String, salle: String},
      s4: {matiere: String, salle: String},
      s5: {matiere: String, salle: String}
    }
})

module.exports = mongoose.model('EmploiProf', emploiProfSchema); 