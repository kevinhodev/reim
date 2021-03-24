import React from 'react'
import './ReconhecimentoDeImagem.css';

const ReconhecimentoDeImagem = ({ caixa, urlDaImagem }) => {
    return (
        <div className = "center ma">
            <div className = "absolute mt3">
                <img id = "imagem" src = {urlDaImagem} alt = "" width = "500px" height = "auto"/>
                <div className = "bounding-box" style = {{ top: caixa.linhaDeCima, right: caixa.colunaDireita, bottom: caixa.linhaDeBaixo, left: caixa.colunaEsquerda }}></div>
            </div>
        </div>
    );
}

export default ReconhecimentoDeImagem
