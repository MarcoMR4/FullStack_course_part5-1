
const Contact = ({name, number}) => {
    return (
        <div>
            <p className = "text-primary" >
                {name} {': '}
                <i className = 'text-success'>{number}</i>
            </p>
            
        </div>
    );
}

export default Contact;