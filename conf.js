db = db.getSiblingDB("lmkoum");
// var nomEleve = "KASSI";
// db.eleves.updateMany(
// 	{},
// 	{$set: {"cursus.0.classe": null}},
// 	{multi: true}
// )

// db.configs.updateMany(
// 	{},
// 	// {$push: {"niveaux.1.matieres": {matiere: 'conduite', coefficient: 1}}},
// 	// {$push: {"niveaux.2.matieres": {matiere: 'conduite', coefficient: 1}}},
// 	{$push: {"niveaux.3.matieres": {matiere: 'conduite', coefficient: 1}}}
// )

db.classes.updateMany(
	{},
	{$push: {enseignements: {matiere: 'conduite', coefficient: 1, codeProf: null}}},
	{multi: true}
)
	