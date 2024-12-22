

const History = (props) => {
    console.log("props values are: ", props);
    if(props.allClicks.lenght === 0){
        return (
            <div>
                the app is used by pressing the buttons
            </div>
        );
    }
    return(
        <div className="text-primary">
            button press history: {props.allClicks.join(' ')}
            <br />
            total: {props.total}
        </div>
    );
};

export default History;