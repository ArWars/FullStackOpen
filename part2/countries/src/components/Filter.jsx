const App = ({ searchTerm, handleSearchChange }) => {
    return (
        <div>
            find countries
            <input
                value={searchTerm}
                onChange={handleSearchChange}
            />
        </div>
    )
}

export default App