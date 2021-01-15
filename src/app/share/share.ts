export const MATIERES: string[] = [
    "Anglais", "Allemand", "Arts Plastiques", "Conduite", "Couture", 
    "Edhc", "Espagnol", "EPS", "Français", "Histoire-Géographie", 
    "Mathématiques", "Musique", "Philosophie", "Physique-Chimie", "SVT", "TICE"
]

export const donneAppreciation = (moyenne)=>{
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


export const donneDistinction = (moyenne)=>{
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