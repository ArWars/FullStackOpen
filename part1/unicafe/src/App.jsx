import { useState } from 'react'


const StatisticLine = (props) => {
    return(
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const Statistics = (props) => {
    const { good, neutral, bad } = props
    const all = good + neutral + bad
    const average = ((good - bad) / (good + neutral + bad)).toFixed(2)
    const positive = ((good / (good + neutral + bad)) * 100).toFixed(2) + "%"

    if (all === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }

    return(
        <div>
            <StatisticLine text="good" value ={good} />
            <StatisticLine text="neutral" value ={neutral} />
            <StatisticLine text="bad" value ={bad} />
            <StatisticLine text="all" value ={all} />
            <StatisticLine text="average" value ={average} />
            <StatisticLine text="positive" value ={positive} />
        </div>
    )
}
const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <button onClick={() => setGood(good + 1)}>good</button>
            <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
            <button onClick={() => setBad(bad + 1)}>bad</button>

            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App