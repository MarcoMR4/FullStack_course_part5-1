import Part from "./part";

const Content = (props) =>{
    return (
      <div>
        {
            props.parts.map((part, key) => {
                return (
                    <Part part = {part.content} key = {key} n = {key} />
                );
            })
        }
        </div>
    )
}

export default Content;