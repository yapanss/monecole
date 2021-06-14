import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllItems(collection, anneeScolaire?): Observable<any>{
    let url: string = "";
    if(anneeScolaire){
      url = 'http://localhost:3000/api/'+collection+'/'+anneeScolaire;
    }else{
      url = 'http://localhost:3000/api/'+collection;
    }
    return this.http.get(url);
  }

  getOneItem(collection, itemId, anneeScolaire?){
    console.log('itemid : ', itemId)
    let url: string = "";
    if(anneeScolaire){
      url = 'http://localhost:3000/api/'+collection+'/'+itemId+'/'+anneeScolaire
    }else{
      url = 'http://localhost:3000/api/'+collection+ '/detail/' +itemId
    }
    return this.http.get(url);
  }

  getSomeItems(collection, critera) {
    return this.http.get('http://localhost:3000/api/'+collection+'/'+critera);
  }

  getSome(collection: string, champ: string, value: any, anneeScolaire?): Observable<any> {
    let url: string = "";
    if(anneeScolaire){
      url = 'http://localhost:3000/api/'+collection+'/'+champ+'/'+value+"/"+anneeScolaire;
    }else{
      url = 'http://localhost:3000/api/'+collection+'/'+champ+'/'+value;
    }
    return this.http.get(url);
  }

  postForm(collection, data) {
    // let token = localStorage.getItem('token')
    let url = 'http://localhost:3000/api/'+collection
    let body = JSON.stringify(data)
    return this.http.post(url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'x-access-token': token
      })
    })
  }
  postPhoto(collection, matricule, photo){
    const formData = new FormData();
    formData.append('photo', photo, photo.name);
    console.log(formData.has('photo'))
    formData.append('matricule', matricule)
    console.log('matricule ? ', formData.get('matricule'))
     let url = 'http://localhost:3000/api/'+collection+'/'+matricule
    return this.http.put(url, formData, {
      headers: new HttpHeaders({
        // 'Content-Type': 'multipart/form-data',
      })
    })
  }
  getPhoto(matricule, mimeType){
    let url = 'http://localhost:3000/'+matricule+'.'+mimeType
    return this.http.get(url)
  }
  updateOneItem(collection, id, data){
    console.log('collection : ', collection, ' id : ', id, 'data : ', data)
     let url = 'http://localhost:3000/api/'+collection+'/'+id
    let body = JSON.stringify(data)
    return this.http.put(url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'x-access-token': token
      })
    })
  }
  updateItems(collection, data) {
    let url = 'http://localhost:3000/api/'+collection
    let body = JSON.stringify(data)
    return this.http.put(url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'x-access-token': token
      })
    })
    
  }
  deleteOneItem(collection, itemId){
     let url = 'http://localhost:3000/api/'+collection+'/'+itemId
    return this.http.delete(url);
  }
}


 