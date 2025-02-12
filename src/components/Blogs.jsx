import { useEffect, useState, useRef } from "react"
import blogService from '../services/blogs'
import Blog from "./Blog"
import Notification from "./Notification"
import BlogForm from "./BlogForm"
import Togglable from "./Togglable"


const Blogs = () => {

    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [newBlog, setNewBlog] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [notification, setNotification] = useState(null)
    const [errorNotification, setErrorNotification] = useState(false)
    const [idToUpdate, setIdToUpdate] = useState(null) 
    const [updating, setUpdating] = useState(false)

    const blogFormRef = useRef()

    useEffect(() => {
        blogService
            .getAll()
            .then(initialBlogs => 
            {
                initialBlogs.sort((a, b) => b.likes - a.likes);
                setBlogs(initialBlogs)
            })
            .catch(error => console.log(`It has occurred an error: ${error}`))

    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          blogService.setToken(user.token)
        }
    }, [])
    

    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()

        if(idToUpdate !== null){
            blogService
                .update(idToUpdate, blogObject)
                .then(updatedBlog => {
                    setNotification(`Blog ${blogObject.title} updated`)
                    setBlogs(blogs.map(blog => 
                        blog.id === idToUpdate ? updatedBlog : blog
                    ));

                    setNewBlog('')
                    setAuthor('')
                    setUrl('')
                    setTimeout(() => {
                        setNotification(null)
                    }, 2000)
                    setIdToUpdate(null)
                })
                .catch((error) => {
                    console.error('It has occurred an error: ', error)
                    setErrorNotification(true)
                    setNotification(`The blog could not be updated.  ${error.response.data.error}`)
                    setTimeout(() => {
                        setNotification(null)
                        setErrorNotification(false)
                    }, 3000)
                })
        }
        else{
            setUpdating(false)
            blogService
            .create(blogObject)
            .then(returnedBlog => {
                setNotification(`Blog ${blogObject.title} by ${blogObject.author} added successfully! `)
                setBlogs(blogs.concat(returnedBlog))
                setNewBlog('')
                setAuthor('')
                setUrl('')
                setTimeout(() => {
                    setNotification(null)
                }, 2000)
            })
            .catch((error) => {
                console.error('It has occurred an error: ', error)
                setErrorNotification(true)
                setNotification(`The blog could not be added.  ${error.response.data.error}`)
                setTimeout(() => {
                    setNotification(null)
                    setErrorNotification(false)
                }, 3000)
            })
        }  
    }

    const handleDeleteBlog = (idToDelete) => {
        const sure = window.confirm('Do you want to delete this blog? ')

        if(sure){
            blogService
            .deleteBlog(idToDelete)
            .then((response) => {
                console.log('Blog deleted successfully ',response)
                setNotification('Blog deleted successfully! ')
                setBlogs(blogs.filter(blog => blog.id !== idToDelete))
                setTimeout(() => {
                    setNotification(null)
                }, 2000)
            })
            .catch((error) => {
                console.error('It has occurred an error: ',error)
                setNotification('The blog could not be deleted ', error)
                setErrorNotification(true)
                setTimeout(() => {
                    setNotification(null)
                    setErrorNotification(false)
                }, 2000)
            })
        }  
        setNotification('ok...')
        setTimeout(() => {
            setNotification(null)
        }, 2000)
    }

    const handleUpdateBlog = (id, title, author, url) => {
        setIdToUpdate(id)
        setAuthor(author)
        setNewBlog(title)
        setUrl(url)
        setUpdating(true)
        blogFormRef.current.toggleVisibility()
    }

    const handleLikeBlog = (id) => {

        let blogSelected = blogs.filter(blog => blog.id === id)
        
        let likes = blogSelected[0].likes
        likes++

        const blogObject = {
            likes: likes,
        }

        blogService
            .update(id, blogObject)
            .then(updatedBlog => {
                setNotification(`Like added! `)
                setBlogs(blogs.map(blog => 
                    blog.id === id ? updatedBlog : blog
                ));

                setNewBlog('')
                setAuthor('')
                setUrl('')
                setTimeout(() => {
                    setNotification(null)
                }, 2000)
            })
            .catch((error) => {
                console.error('It has occurred an error: ', error)
                setErrorNotification(true)
                setNotification(`The blog could not be updated.  ${error.response.data.error}`)
                setTimeout(() => {
                    setNotification(null)
                    setErrorNotification(false)
                }, 3000)
            })
    }


    if (user === null) {
        return (
          <div>
            <h2>Log in to application</h2>
          </div>
        )
    }

    return (
        <div>
            <h2>Blogs</h2>

            {user === null ?
                <div> You must be logged to add Blogs </div>:
                <div>
                <Togglable buttonLabel='new blog' ref={blogFormRef}>
                    <BlogForm
                        createBlog={addBlog}
                        updateTitle={newBlog}
                        updateAuthor={author}
                        updateUrl={url}
                        updating={updating}
                        idToUpdate={idToUpdate}
                    />
                </Togglable>
                </div>
            }

            <Notification message={notification} error={errorNotification} />

            <ul>
            {
                blogs.map((blog ) => (
                   <li key={blog.id} >
                    <Blog 
                        title={blog.title} 
                        author={blog.author}
                        likes={blog.likes}
                        url={blog.url}
                        handleDeleteBlog={handleDeleteBlog}
                        handleUpdateBlog={handleUpdateBlog}
                        handleLikeBlog={handleLikeBlog}
                        id={blog.id}
                   />
                   </li> 
                ))
            }
            </ul>
            
        </div>
    )
}

export default Blogs