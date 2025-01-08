
const Contact2 = ({name, number, handleDeletePerson}) => {
    return (
        <div>
            <p className = "text-success" >
                {name} {': '}
                <i className = 'text-primary'>{number}</i>
                &nbsp;
                <button onClick={handleDeletePerson}>delete</button>
            </p>
            
        </div>
    );
}

export default Contact2;