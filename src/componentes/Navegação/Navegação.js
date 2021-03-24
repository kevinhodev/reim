import React from 'react'

const Navegação = ({ quandoARotaAlterar, entrou }) => {
        if (entrou)
        {
            return <nav style = {{ display: 'flex', justifyContent: 'flex-end' }}>
                        <p onClick = { () => quandoARotaAlterar('signin') } className = 'f3 link dim black underline pa3 pointer white'> Sair </p>
                   </nav>
        }
        else
        {
            return <nav style = {{ display: 'flex', justifyContent: 'flex-end' }}>
                        <p onClick = { () => quandoARotaAlterar('signin') } className = 'f3 link dim black underline pa3 pointer white'> Entrar </p>
                        <p onClick = { () => quandoARotaAlterar('registrar') } className = 'f3 link dim black underline pa3 pointer white'> Registrar </p>
                    </nav>

        }
}

export default Navegação;
