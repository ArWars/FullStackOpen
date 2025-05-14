const App = ({ persons, deletePerson }) => {

    return (
        <ul>
            {persons.map((person) => (
                <li key={person.id} className="person">
                    {person.name} {person.number}
                    <button onClick={(e) => deletePerson(e, person)}>delete</button>
                </li>
            ))}
        </ul>
    )
}

export default App