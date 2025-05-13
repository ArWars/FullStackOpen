const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {
    return (
        <div>
            { props.parts.map(part => (
                <Part name={part.name} exercises={part.exercises} />
            )) }
        </div>
    );
}

const Part = (part) => {
    return  (
        <p key={part.name}>
            {part.name} {part.exercises}
        </p>
    )
}

const Total = (props) => {
    const total = props.parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <p>Number of exercises {total}</p>
    )
}

const App = () => {
    const data = {
        course: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            },
            {
                name: 'Redux',
                exercises: 12
            }
        ]
    }

    return (
        <div>
            <Header course={data.course} />
            <Content parts={data.parts} />
            <Total parts={data.parts} />
        </div>
    )
}

export default App