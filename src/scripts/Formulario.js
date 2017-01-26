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

    let imc = calcular(this.state.peso, this.state.altura);

    this.refs.nome.value = '';
    this.refs.idade.value = '';
    this.refs.peso.value = '';
    this.refs.altura.value = '';

    setTimeout(() => {
      alert(imc);
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
        <form onSubmit={::this.handleSubmit}>
          <label htmlFor="nome">Nome</label>
          <br />
          <input type="text" id="nome" defaultValue="" placeholder="Digite seu nome" ref="nome" required/>
          <br />
          <label htmlFor="idade">Idade</label>
          <br />
          <input type="number" id="idade" defaultValue="" placeholder="Digite sua idade" ref="idade" required/>
          <br />
          <label htmlFor="peso">Peso</label>
          <br />
          <input type="text"
                 id="peso"
                 value={this.state.peso}
                 onChange={::this.handlePesoChange}
                 placeholder="Digite seu peso"
                 ref="peso"
                 required/>
          <br />
          <label htmlFor="altura">Altura</label>
          <br />
          <input type="text"
                 id="altura"
                 value={this.state.altura}
                 onChange={::this.handleAlturaChange}
                 placeholder="Digite sua Altura"
                 ref="altura"
                 required/>
          <br />
          <br />
          <input type="submit" id="calcular" value="Descubrir!"/>
        </form>
      </div>
    );
  }
}
