
const NotificacionAdd = ({name}) => {
    const styleN = {
        color: 'green',
        backgroundColor: 'silver',
        padding: 5,
        textAlign: 'center',
        borderColor: 'green', 
        border: 'solid'
    }

    if(name === ''){
        return null;
    }
    else{
        return (
            <div style = {styleN}>
                <p>{name} has been added successfully! </p>
            </div>
        )
    }
    
}

export default NotificacionAdd