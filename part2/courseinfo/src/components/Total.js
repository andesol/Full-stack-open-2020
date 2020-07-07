import React from 'react'

const Total = ({parts}) => {
    console.log(parts)

    const total = parts.reduce((accum,current) => {
        console.log(accum, current)
        return accum += current.exercises;
    },0)
    
    
    return (
        <p><strong>Total of {total} exercices</strong></p>
    )

    
}

export default Total;
