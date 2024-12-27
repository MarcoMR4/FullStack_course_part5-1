import Note from "./components/note";
import Course from "./components/Course";
import Header from "./components/Header";
import Contact from "./components/Contact";
import { useState } from "react";
import PeopleFilter from "./components/PeopleFilter";
import PeopleForm from "./components/Peopleform";

const App = ( props ) => {

  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState(
    'a new note...'
  );
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true);
  
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    },
    {
      name: 'MongoDB',
      id: 3,
      parts: [
        {
          name: 'Introduction to MongoDB',
          exercises: 5,
          id: 1
        },
        {
          name: 'CRUD Operations',
          exercises: 20,
          id: 2
        }
      ]
    }
  ]

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
    
    setNotes(notes.concat(noteObject));
    setNewNote('');
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  }

  const [people, setPeople] = useState([
    { name: 'Arto Hellas', number: '52-44-545654', id: 1 }, 
    { name: 'Mark Maket', number: '87-44-578654', id: 2 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 3 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 4 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 5 }
  ]) 
  const [filteredPeople, setFilteredPeople] = useState(people);

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const addNewContact = (event) => {
    event.preventDefault();
    people.map(person => {
      if(person.name === newName || person.number === newNumber){
        alert(`${newName}  is already added to the phonebook`);
        setPeople(people);
      }
      else{
        const personObject = {
          id: people.length + 1,
          name: newName,
          number: newNumber,
        }
        setPeople(people.concat(personObject));
        setNewName('');
        setNewNumber('');
        setFilteredPeople(people);
      }
    });
    
  }

  const handleFilterContacts = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setFilter(value); 

    if(value === ''){
      setFilteredPeople(people);
    }
    else{
      setFilteredPeople(people.filter(person => 
        person.name.toLowerCase().includes(filter.toLowerCase()) || person.number.includes(filter)
      ))
    }
  }
  

  return (
    <>
    <div className="container p-2">
      <div className = "row mb-3 border">
        <div className = "col-md-12">
          <Header header = "Contacts" />
          <h2 className = 'text-danger mb-3'>Phonebook</h2>

          <PeopleFilter filter = {handleFilterContacts} />
        
          <PeopleForm 
            handleNameChange = {handleNameChange} 
            handleNumberChange = {handleNumberChange} 
            addNewContact={addNewContact}
          />
          <h2>Numbers</h2>
          {filteredPeople.map(person => 
            <Contact key = {person.id} name = {person.name} number = {person.number} />
          )}
        </div>
      </div>


      <div className="row border">
        <div className="col-md-6">
          <Header className="mb-3" header="Courses"/>
          {courses.map(course => 
              <Course id = {course.id} key = {course.id} name = {course.name} parts = {course.parts} />
          )}
        </div>

        <div className="col-md-6 border">
          <Header header="Notes"/>
          <div>
            <button onClick = {() => setShowAll(!showAll)}>
              show {showAll ? 'important' : 'all'}
            </button>
          </div>
          <ul>
            {notesToShow.map(note => 
              <Note key = {note.id} note = {note} />
            )}
          </ul>
          <form onSubmit = {addNote}>
            <input 
              value = {newNote}
              onChange = {handleNoteChange}
            />
            <button type="submit">save</button>

          </form>
        </div>

      </div>

    </div>
   

    </>
    
  )
}

export default App;