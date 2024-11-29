import { Firestore, collection, collectionData, docData } from '@angular/fire/firestore';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { deleteDoc, doc, DocumentReference, getDoc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
uuidv4();

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firestore: Firestore = inject (Firestore);

  constructor() { }

  getCollectionChanges<tipo>(path: string){
    const refcollection = collection(this.firestore, path);
    return collectionData(refcollection) as Observable<tipo[]>;
  }

  getDocument<tipo>(enlace: string){
    const document = doc(this.firestore, enlace) as DocumentReference<tipo, any>;
    return getDoc<tipo, any>(document)
  }

  getDocumentChanges<tipo>(enlace: string){
    console.log('getDocumentChanges -> ', enlace);
    const document =doc (this.firestore, enlace);
    return docData(document) as Observable<tipo[]>; 
  }

  createDocumentID(data: any, enlace: string, idDoc: string){
    const document = doc(this.firestore, `${enlace}/${idDoc}`);
    return setDoc(document,data);
  }

  createIdDoc(){
    return uuidv4()
  }

  deleteDocumentID(enlace: string, idDoc: string){
    const document = doc(this.firestore, `${enlace}/${idDoc}`);
    return deleteDoc(document);
  }

  deletedDocFromRef(ref: any){
    return deleteDoc(ref)
  }
}
