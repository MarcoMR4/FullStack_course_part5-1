import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'
import loginService from './services/login'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'

// (untill ex 5.11)

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const noteFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
        .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleDeleteNote = id => {
    noteService
      .deleteNote(id)
      .then(response => {
        setErrorMessage('Note deleted successfully! ')
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 

      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      window.location.reload()
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

    const loginForm = () => {
      const hideWhenVisible = { display: loginVisible ? 'none' : '' }
      const showWhenVisible = { display: loginVisible ? '' : 'none' }
  
      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={() => setLoginVisible(true)}>log in</button>
          </div>
          <div style={showWhenVisible}>
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
            <button onClick={() => setLoginVisible(false)}>cancel</button>
          </div>
        </div>
      )
  }

  return (
    <div className = "container p-3">
      <div className="row">
        <div className='col-md-6 mx-auto bg-light p-3'>
        {!user && loginForm()}
          {user && <div>
              <p>
                <b>{user.name}</b> logged in
                <button onClick={handleLogout}>Logout</button>
              </p> 
              <Togglable buttonLabel='new note' ref={noteFormRef}>
                <NoteForm
                  createNote={addNote}
                />
              </Togglable>
            </div>
          } 
        </div>
      </div>
      <div className = "row">
        <div className = "col-md-6">
          <h1>Notes</h1>
          <Notification message={errorMessage} error={true} />

          <div>
            <button onClick={() => setShowAll(!showAll)}>
              show {showAll ? 'important' : 'all' }
            </button>
          </div>      
          <ul>
            {notesToShow.map(note => 
              <Note
                key={note.id}
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}
                handleDeleteNote = {() => handleDeleteNote(note.id)}
              />
            )}
          </ul>
        </div>
        <div className = "col-md-6">
            <Blogs />
        </div>
      </div>
      <div className='row'>
        <Footer />
      </div>
    </div>
  )
}

export default App