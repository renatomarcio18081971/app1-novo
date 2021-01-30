import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Coracao } from '../shared/coracao.model';

@Component({
  selector: 'app-tentativas',
  templateUrl: './tentativas.component.html',
  styleUrls: ['./tentativas.component.css']
})

export class TentativasComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public tentativas: number = 0
  public coracoes: Coracao[] = [
    new Coracao(true),
    new Coracao(true),
    new Coracao(true)
  ]

  constructor() { 
  }

  ngOnDestroy(): void {
    
  }

  ngOnChanges(): void {
    if (this.tentativas !== this.coracoes.length){
      let indice = (this.coracoes.length - this.tentativas) - 1
      this.coracoes[indice].cheio = false
    }
  }
    
  ngOnInit(): void {
    
  }

}
