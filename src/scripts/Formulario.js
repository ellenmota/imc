import React from 'react';

import {calcular} from './Calculo';

export default class Formulario extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      peso: '',
      altura: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    let nome = this.refs.nome.value;
    let imc = calcular(this.state.peso, this.state.altura);

    this.refs.nome.value = '';
    this.refs.idade.value = '';
    this.refs.peso.value = '';
    this.refs.altura.value = '';

    let conclusao = "";
    if(imc<18.5){
      //abaixo do peso
      conclusao = "Abaixo do peso";
    } else if(imc >= 18.5 && imc <= 24.9){
      //peso ideal
      conclusao = "Peso Ideal!";
    } else if (imc >= 25 && imc <= 29.9) {
      //sobrepeso
      conclusao = "Sobrepeso.";
    } else if(imc >= 30 && imc <= 34.9){
      //obesidade I
      conclusao = "Obesidade I :(";
    } else if(imc >= 35 && imc <= 39.9){
      //obesidade II
      conclusao = "Obesidade II :(";
    } else if(imc > 40){
      //obesidade III
      conclusao = "Obesidade III :(";
    }

    setTimeout(() => {
      console.log(nome + ", Seu Imc é: "+imc.toFixed(2)+", conclusão: " +conclusao);
    }, 200);
  }

  handlePesoChange() {
    let peso = this.refs.peso.value.replace(',', '.').replace(/[a-zA-Z]/g, '');
    console.log(peso);

    this.setState({peso});
  }

  handleAlturaChange() {
    let altura = this.refs.altura.value.replace(',', '.').replace(/[a-zA-Z]/g, '');

    this.setState({altura});
  }

  render(){
    return(
      <div>
        <center><h1>Descubra seu IMC!</h1></center>

        <form onSubmit={::this.handleSubmit}>
          <div className="40-percent">
            <label htmlFor="nome">Nome</label>
            <input type="text" id="nome" defaultValue="" placeholder="Digite seu nome" ref="nome" required/>

            <label htmlFor="idade">Idade</label>
            <input type="number" id="idade" defaultValue="" placeholder="Digite sua idade" ref="idade" required/>

            <label htmlFor="peso">Peso</label>
            <input type="text"
                   id="peso"
                   value={this.state.peso}
                   onChange={::this.handlePesoChange}
                   placeholder="Digite seu peso"
                   ref="peso"
                   required/>

            <label htmlFor="altura">Altura</label>
            <input type="text"
                   id="altura"
                   value={this.state.altura}
                   onChange={::this.handleAlturaChange}
                   placeholder="Digite sua Altura"
                   ref="altura"
                   required/>

            <div className="buttons">
              <input type="submit" id="calcular" value="Descubrir!"/>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
