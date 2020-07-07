import React from 'react'

const Persons = ({persons, deletePerson}) => {

    return (
        <div>
            {persons.map( person => {
                return <li key={person.id}>{person.name} - {person.number} <button onClick={() => deletePerson(person)}>Delete</button></li>    
            })}
        </div>
    )
}

export default Persons