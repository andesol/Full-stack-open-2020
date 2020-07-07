import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification'
import Error from './components/Error';

import './index.css';

import phones from './services/phones';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [addedMessage, setAddedMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect( () => {
    phones
      .getAll()
      .then(data => {
        setPersons(data);
      }
  )}, [])

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  }

  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value);
  }

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearch(search)
    const nameToSearch = search.toLowerCase();
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(nameToSearch))
    setFilteredPersons(filteredPersons);
  }

  const addPerson = (e) => {
    e.preventDefault();
    if (newName !== "") {
      const newPerson = { 
        name: newName,
        number: newNumber,
      };
      const repeated = persons.find(person => {
        return person.name === newPerson.name;
      })
      if (repeated) {
        if (window.confirm(`Do you want to update ${repeated.name}?`)) {
          phones
            .update(repeated, newPerson)
            .then(personUpdated => {
              const newPersons = persons.map(p => p.id === repeated.id ? personUpdated : p);
              setPersons(newPersons);            
            })
            .catch ( (err) => {
              if(err.response.status === 404) {
                setErrorMessage(`${newPerson.name} already removed`);
                setTimeout( () => setErrorMessage(null), 3000)
              }

            }
            )
          }
      } else {
        phones
        .create(newPerson)
        .then(res => {
          setPersons([...persons, newPerson])
          setNewName("");
          setNewNumber("")
          setAddedMessage(`${newPerson.name} added`)
          setTimeout( () => setAddedMessage(null), 3000)
        })       
      }
    }
  }
    
  const deletePerson = (personToDelete) => {
    if (window.confirm('Are you sure?')) {
      phones.deleteOne(personToDelete)
        .then(res => {
          const newPersons = persons.filter(person => person.id !== personToDelete.id);
          setPersons(newPersons)
        })
    }        
  }
    
  const personsToShow = search ? filteredPersons : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addedMessage} />
      <Error message={errorMessage} />
      <Filter search={search} handleSearch={handleSearch} />
      <h2>Add a new</h2>
      <PersonForm 
        addPerson ={addPerson}
        newName = {newName}
        handleChangeName = {handleChangeName}
        newNumber = {newNumber}
        handleChangeNumber = {handleChangeNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
