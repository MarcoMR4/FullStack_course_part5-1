import { useState, useEffect } from "react"

const BlogForm = ({createBlog, updateTitle, updateAuthor, updateUrl, updating}) => {
    const [newBlog, setNewBlog] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    useEffect(() => {
        if (updating) {
            setNewBlog(updateTitle);
            setAuthor(updateAuthor);
            setUrl(updateUrl);
        } else {
            setNewBlog('');
            setAuthor('');
            setUrl('');
        }
    }, [updateTitle, updateAuthor, updateUrl, updating]);

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newBlog,
            url: url,
            author: author
        })
        setNewBlog('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <form onSubmit={addBlog}>
                <label htmlFor="title">Title:</label>
                <input
                    id="title"
                    value={newBlog}
                    onChange={event => setNewBlog(event.target.value)}
                    required
                />
                <br />
                <label htmlFor="author">Author:</label>
                <input
                    id="author"
                    value={author}
                    onChange={event => setAuthor(event.target.value)}
                    required
                />
                <br />
                <label htmlFor="url">Url:</label>
                <input
                    id="url"
                    value={url}
                    onChange={event => setUrl(event.target.value)}
                    required
                />
                <br />
                <button type="submit">{updating ? 'update' : 'save'}</button>
            </form> 
        </div>
    )

}

export default BlogForm