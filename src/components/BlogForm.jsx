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
                    Title:
                <input
                    value={newBlog}
                    onChange={event => setNewBlog(event.target.value)}
                    required
                />
                <br />
                Author:
                <input
                    value={author}
                    onChange={event => setAuthor(event.target.value)}
                    required
                />
                <br />
                Url:
                <input
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