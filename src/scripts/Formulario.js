import React from 'react';

export default class Formulario extends React.Component{

  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <form action="" method="post">
          <label>Nome</label>
          <br />
          <input type="text" name="nome" value="" placeholder="Digite seu nome"/>
          <br />
          <label>Idade</label>
          <br />
          <input type="number" name="idade" value="" placeholder="Digite sua idade"/>
          <br />
          <label>Peso</label>
          <br />
          <input type="number" name="peso" value="" placeholder="Digite seu peso"/>
          <br />
          <label>Altura</label>
          <br />
          <input type="number" name="altura" value="" placeholder="Digite sua Altura" />
          <br />
          <br />
          <input type="submit" name="calcular" value="Descubrir!"/>
        </form>
      </div>
    );
  }
}
