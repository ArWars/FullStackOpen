import { useState, useEffect } from 'react'
import './index.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState([])
    const [notifications, setNotifications] = useState([]);
    const [filteredPersons, setFilteredPersons] = useState(persons)
    const [searchTerm, setSearchTerm] = useState('')

    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')

    const onChangeName = (event) => {
        setNewName(event.target.value)
    }
    const onChangePhone = (event) => {
        setNewPhone(event.target.value)
    }
    const onAdd = (event) => {
        event.preventDefault()
        const person = {
            name: newName,
            number: newPhone
        }
        const personExist = persons.some(p => p.name === person.name)
        if (personExist) {
            if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
                const updatedPerson = {
                    ...person,
                    id: persons.find(p => p.name === person.name).id
                }
                personService.update(updatedPerson.id, updatedPerson).then(response => {
                    setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
                    setNewName('')
                    setNewPhone('')
                    setNotifications(prev => [...prev, {
                        type: 'success',
                        message: `Updated ${updatedPerson.name}`
                    }])
                }).catch(error => {
                    setNotifications(prev => [...prev, {
                        type: 'error',
                        message: `Unable to update ${updatedPerson.name}`
                    }])
                });
            }
        }else {
            const newPerson = {
                ...person,
                id: (persons.length + 1).toString()
            }
            personService.create(newPerson).then(response => {
                setPersons(persons.concat(newPerson))
                setNewName('')
                setNewPhone('')
                setNotifications(prev => [...prev, {
                    type: 'success',
                    message: 'Added ' + newPerson.name
                }])
            }).catch(error => {
                setNotifications(prev => [...prev, {
                    type: 'error',
                    message: `Unable to add ${newPerson.name}`
                }])
            })
        }
    }

    const deletePerson = (e, person) => {
        e.preventDefault()

        if (window.confirm(`Delete ${person.name}?`)) {
            personService.remove(person.id).then(response => {
                setPersons(persons.filter(p => p.id !== person.id))
            }).catch(error => {
                setNotifications(prev => [...prev, {
                    type: 'error',
                    message: `Information of ${person.name} has already been removed from server`
                }])
            })
        }
    }

    const handleSearchChange = (event) => {
        const term = event.target.value
        setSearchTerm(term)
        const filtered = persons.filter(person => person.name.toLowerCase().includes(term.toLowerCase()))
        setFilteredPersons(filtered)
    }

    useEffect(() => {
        const filtered = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilteredPersons(filtered)
    }, [persons]);


    useEffect(() => {
        personService.getAll().then((persons) => {
            setPersons(persons)
            setFilteredPersons(persons)
        }).catch( (error) => {
            console.error('Error fetching data:', error)
            setNotifications(prev => [...prev, {
                type: 'error',
                message: 'Unable to fetch data from server'
            }])
        })
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>

            <Notification notifications={notifications} setNotifications={setNotifications} />
            <Filter handleSearchChange={handleSearchChange} searchTerm={searchTerm} />

            <h3>Add a new</h3>

            <PersonForm
                newName={newName}
                newPhone={newPhone}
                onChangeName={onChangeName}
                onChangePhone={onChangePhone}
                onAdd={onAdd}
            />

            <h3>Numbers</h3>

            <Persons
                persons={filteredPersons}
                deletePerson={deletePerson}
            />
        </div>
    )
}

export default App