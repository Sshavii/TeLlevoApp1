import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import type { QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from '../Serivicioapi/api.service';
import { UserI } from '../common/models/services/user.models';
import { DireccionComponent } from './Components/direccion/direccion.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit{
  hideFooter: boolean = false;
  lastScrollTop: number = 0;
  userEmail: string | null = null;

  constructor(
    private animationCtrl: AnimationController,
    private route: ActivatedRoute,
    private storage: Storage,
    private api:ApiService
  ) {
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

  animateCards(){
    const cards = document.querySelectorAll('.servicio');

    cards.forEach(card => {
      const animation = this.animationCtrl.create()
        .addElement(card)
        .duration(2000)
        .fromTo('transform', 'translateY(100%)', 'translateY(0)')
        .fromTo('opacity', '0', '1');
      
      animation.play();
      });
    }
    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        this.userEmail = params ['email'] || 'Usuario'
      });
      this.animateCards();
    }

    async verStorage(){
      const email = await this.storage.get("emailUsuario");
      console.log("El email es: "+ email) 
    }
  }

  

