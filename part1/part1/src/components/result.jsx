
const Result = ({ anecdotes, points }) => {
    let max = points.indexOf(Math.max(...points));

  return (
    <div>
      {anecdotes[max]}  
    </div>
  );
}

export default Result;