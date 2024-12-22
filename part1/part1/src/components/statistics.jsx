
const Statistics = (props) => {
    const {good, neutral, bad} = props;
    let total = good + neutral + bad;
    if(total > 0){
        return(
            <div>
                <h3>Statistics</h3>
                <br />
                Good: {good}
                <br />
                Neutral: {neutral}
                <br />
                Bad: {bad}
                <br />
                All: {good + neutral + bad}
                <br />
                Average: {(good - bad) / (good + neutral + bad)}
                <br />
                Positive: {(good / (good + neutral + bad)) * 100}%
            </div>
        );
    }
    return(
        <div>
            <h3>Statistics</h3>
            <br />
            No feedback given
        </div>
    );
}

export default Statistics;