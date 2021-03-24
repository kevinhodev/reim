import React from 'react'
import './FormulárioDeLinkDaImagem.css'

const FormulárioDeLinkDaImagem = ({ quandoAEntradaMudar, aoPressionarOBotãoDetectar }) => {
    return (
        <div>
            <p className = 'f3 título'> Este Aplicativo Mágico Detectará Rostos em sua Imagem. Experimente! </p>
            <div className = 'center'>
                <div className = 'pa4 br3 shadow-5 center form'>
                    <input className = 'f4 pa2 w-70 center' type = 'text' onChange = { quandoAEntradaMudar }/>
                    <button className = 'w-30 grow f4 link ph3 pv2 dib white bg-red' onClick = { aoPressionarOBotãoDetectar }> Detectar </button>
                </div>
            </div>
        </div>
    );
}

export default FormulárioDeLinkDaImagem;
