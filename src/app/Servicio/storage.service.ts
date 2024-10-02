import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private bdd: Storage = new Storage();
  constructor(private storage: Storage) { 
    this.onInit();
  }

  async onInit(){
    const storage = await this.storage.create();
    this.bdd = storage;
  }

  async get(key:string): Promise<any>{
    return this.bdd.get(key);
  }
  
  async set(key:string): Promise<any>{
    return this.bdd.get(key);
  }
}
