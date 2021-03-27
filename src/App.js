import './App.css';
import Navegação from './componentes/Navegação/Navegação';
import Logo from './componentes/Logo/Logo';
import FormulárioDeLinkDaImagem from './componentes/Formulário/FormulárioDeLinkDaImagem';
import Rank from './componentes/Rank/Rank';
import ReconhecimentoDeImagem from './componentes/ReconhecimentoDeImagem/ReconhecimentoDeImagem';
import Signin from './componentes/Signin/Signin';
import Registrar from './componentes/Registro/Registrar';
import Particles from 'react-particles-js';
import React from 'react';

const opçõesDePartículas = {
  particles: 
  {
    line_linked: 
    {
      shadow: 
      {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    },
    number:
    {
      value: 30,
      density:
      {
        enable: true,
        value_area: 800
      }
    }
  },
}

const estadoInicial = {
  entrada: '',
  urlDaImagem: '',
  caixa: {},
  rota: 'signin',
  entrou: false,
  usuário: {
    id: "",
    nome: "",
    email: "",
    senha: "",
    entradas: 0,
    entrouQuando: ""
  }
}

class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      entrada: '',
      urlDaImagem: '',
      caixa: {},
      rota: 'signin',
      entrou: false,
      usuário: {
        id: "",
        nome: "",
        email: "",
        senha: "",
        entradas: 0,
        entrouQuando: ""
      }
    }
  }

  carregarUsuário = (data) => {
    this.setState({usuário: { 
      id: data.id,
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      entradas: data.entradas,
      entrouQuando: data.entrouQuando 
     }})
  }

  calcularLocalizaçãoDoRosto = (dados) => {
    const rosto = dados.outputs[0].data.regions[0].region_info.bounding_box;
    const imagem = document.getElementById("imagem");
    const largura = Number(imagem.width);
    const altura = Number(imagem.height);
    return {
      colunaEsquerda: rosto.left_col * largura,
      linhaDeCima: rosto.top_row * altura,
      colunaDireita: largura - (rosto.right_col * largura),
      linhaDeBaixo: altura - (rosto.bottom_row * altura)
    }
  }

  exibirCaixaDeRosto = (caixa) =>
  {
    console.log(caixa);
    this.setState({ caixa: caixa });
  }

  aoPressionarOBotãoDetectar = () =>
  {
    this.setState({ urlDaImagem: this.state.entrada });
      fetch("https://powerful-anchorage-32277.herokuapp.com/urlDaImagem",{
        method: 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({ 
            entrada: this.state.entrada
        })
      })
      .then(resposta => resposta.json())
      .then(response => { 
        if(response)
        {
          fetch("https://powerful-anchorage-32277.herokuapp.com/imagem",{
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({ 
                id: this.state.usuário.id
             })
          })
          .then(resposta => resposta.json())
          .then(contagem => {
            this.setState({
              usuário: {
                ...this.state.usuário,
                entradas: contagem
              }
            })
          })
          .catch(console.log)
        }
        this.exibirCaixaDeRosto(this.calcularLocalizaçãoDoRosto(response))})
      .catch(err => console.log(err));
  }

  quandoAEntradaMudar = (event) => {
    this.setState({ entrada: event.target.value });
  }

  quandoARotaAlterar = (rota) => {
    if (rota === 'signin')
    {
      this.setState(estadoInicial)
    }
    else if (rota === 'início')
    {
      this.setState({ entrou: true })
    }

    this.setState({ rota: rota })
  }

  render() 
  {
    const { entrou, urlDaImagem, rota, caixa } = this.state;

    return (
      <div className="App">
        <Particles params = { opçõesDePartículas } className = "partículas"/>
        <Navegação quandoARotaAlterar = { this.quandoARotaAlterar } entrou = { entrou }/>
        { rota === 'início' 
          ? <div> 
              <Logo />
              <Rank nome = { this.state.usuário.nome } entradas = { this.state.usuário.entradas }/>
              <FormulárioDeLinkDaImagem quandoAEntradaMudar = { this.quandoAEntradaMudar } aoPressionarOBotãoDetectar = { this.aoPressionarOBotãoDetectar }/>
              <ReconhecimentoDeImagem caixa = { caixa } urlDaImagem = { urlDaImagem }/>
            </div> 
          
          : (
              rota === 'signin'
              ?  <Signin quandoARotaAlterar = { this.quandoARotaAlterar } carregarUsuário = { this.carregarUsuário }/> 
              :  <Registrar quandoARotaAlterar = { this.quandoARotaAlterar } carregarUsuário = { this.carregarUsuário }/>
            )  
        }
      </div>
    );
  }
}

export default App;
