import React from 'react'

const Rank = ({ nome, entradas }) => {
    return (
        <div>
            <div className = 'white f3'>
                { `${nome}, seu número de entradas é...` }
            </div>
            <div className = 'white f1'>
                { entradas }
            </div>
        </div>
    )
}

export default Rank
