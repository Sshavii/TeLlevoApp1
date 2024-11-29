import { FirestoreService } from './../common/services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { UserI } from '../common/models/services/user.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons'


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  hideFooter: boolean = false;
  lastScrollTop: number = 0;
  users: UserI[] = [];
  newUser: UserI;
  cargando: boolean = false;

  constructor( private firestoreService : FirestoreService,
    private formBuilder: FormBuilder
  ) { 
    this.loadusers()
    this.getUser()
    addIcons({create: icons['create']})
    addIcons({trash: icons['trash']})
  }

  onScroll(event:any){
    const scrollTop = event.detail.scrollTop;

    if(scrollTop > this.lastScrollTop){
      //Desliza hacia abajo
      this.hideFooter = true;
    } else{
      //Desliza hacia arriba
      this.hideFooter = false;
    }
    this.lastScrollTop = scrollTop;
  }

  
  ngOnInit() {
  }
    //Firebase, CRUD

    loadusers() {
      this.firestoreService.getCollectionChanges <UserI>('Usuarios').subscribe( data =>{
        if(data) {
          this.users = data
        }
      }) 

    }

    edit(user: UserI){
      console.log('edit -> ', user)
      this.newUser = user;
    }

    async delete(user: UserI){
      this.cargando = true;
      await this.firestoreService.deleteDocumentID('Usuarios', user.id)
      this.cargando = false;
    }

    async getUser(){
      const uid = 'b8d384da-9c17-4b56-8d29-4f6d65a0f639';
      this.firestoreService.getDocumentChanges<UserI>('Usuarios/' + uid).subscribe( data => {
        console.log ('getuser -> ', data);
        if (data){
        this.users = data
        }
      })
    }

    async save(){
      this.cargando = true;
      await this.firestoreService.createDocumentID(this.newUser, "Usuarios", this.newUser.id)
      this.cargando = false;
    }
}
