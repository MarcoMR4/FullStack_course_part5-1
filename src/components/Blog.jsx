import { useState } from "react"


const Blog = ({title, author, url, likes, handleDeleteBlog, handleUpdateBlog, handleLikeBlog, id}) => {

    const [showDetails, setShowDetails] = useState(false)

    const handleShowDetails = () => {
        setShowDetails((prev) => !prev);
    }

    return(
        <div className = "mt-2">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h5 style={{ margin: 0 }}>{title}</h5>
                <button style={{ padding: "4px 8px", fontSize: "12px", border: "none" }} onClick={handleShowDetails}>
                    {showDetails ? "hide" : "view"}
                </button>
            </div>
            <br />

            {showDetails &&
                <div>
                    Author: <i>{author}</i>
                    <br />
                    Url: <a href="#">{url}</a>
                    <br />
                    Likes: {likes} 
                    <br />
                    <button onClick={() => handleDeleteBlog(id)}>Delete</button>
                    <button onClick={() => handleUpdateBlog(id, title, author, url)}>Update</button>
                    <br />
                    <button onClick={() => handleLikeBlog(id)}>Loik!</button>
                    
                </div>
            }
        </div>
       
    )
}

export default Blog