
export const Header = (props) => {
    console.log(props);
    return (
        <div>
            <p className="h1">
                {props.course}
            </p>
        </div> 
    );
};