const App = (props = {
    newName: '',
    newPhone: '',
    onChangeName: () => {},
    onChangePhone: () => {},
    onAdd: () => {},
}) => {
    return (
        <>
            <form>
                <div>
                    name: <input id="name" value={props.newName} onChange={props.onChangeName}/>
                </div>
                <div>
                    number: <input id="number" value={props.newPhone} onChange={props.onChangePhone}/>
                </div>
                <div>
                    <button type="submit" onClick={props.onAdd}>add</button>
                </div>
            </form>
        </>
    );
}
export default App