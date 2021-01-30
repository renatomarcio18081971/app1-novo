import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public frases: Frase[] = FRASES
  public instrucao: string = 'Traduza a frase'
  public resposta: string = ''
  public rodada: number = 0
  public progresso: number = 0
  public rodadaFrase!: Frase
  public tentativas: number = 3
  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() { 
    this.atualizaRodada()
  }

  ngOnInit(): void {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
  }

  ngOnDestroy(): void {
    console.log('painel foi destruido')    
  }

  public verificarResposta(): void {
    if (this.resposta === '' && this.progresso < 100){
      alert('Digite a tradução !')
      return
    }
    else if (this.progresso === 100) {
      alert('Fim da tradução !')
    }
    if (this.resposta === this.rodadaFrase.frasePtBr){
      this.rodada++
      this.progresso = this.progresso + (100 / this.frases.length)
      this.atualizaRodada()
      if (this.rodada === 4) {
        this.encerrarJogo.emit('vitoria')
        this.progresso = 100
      }
    }
    else {
      this.tentativas--
      if (this.tentativas === -1){
        this.encerrarJogo.emit('derrota')
      }
    }
  }

  public atualizaRodada(): void {
    this.resposta = ''
    this.rodadaFrase = this.frases[this.rodada]
  }
}
