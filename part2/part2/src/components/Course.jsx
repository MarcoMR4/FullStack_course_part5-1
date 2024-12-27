import Header from "./Header"
import Content from "./Content";

const Course = ({name, parts, id}) => {
   
    let total = 0; 
    for(let part of parts){
        total += part.exercises;
    }

    return (
        <div className="mb-4">
            <Header header={name} />
            <br />
            <Content parts={parts} />
            <br /><br />
            <b>Total of exercises: {total}</b>
        </div>
    )
}

export default Course;