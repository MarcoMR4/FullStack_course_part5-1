import peopleService from "../services/peopleService";
import { useState, useEffect } from "react";
import Contact2 from "./Contact2";
import PeopleForm from "./Peopleform";
import PeopleFilter from "./PeopleFilter";
import NotificacionAdd from "./NotificacionAdd";
import Notification from "./Notification";

const People2 = () => {

    const [people, setPeople] = useState([]);
    const [filteredPeople, setFilteredPeople] = useState([]);

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const [addingName, setAddingName] = useState('')
    const [errorNotification, setErrorNotificacion] = useState('')

    useEffect(() => {

        peopleService
            .getAll()
            .then(peopleList => {
                setPeople(peopleList)
            })

        console.log(people)

        setFilteredPeople(people);

    }, [])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const addNewContact = (event) => {
        event.preventDefault();
        let approved = true; 
        let personObject = {}; 
        let idToUpdate = 0;

        people.forEach(person => {
            if(person.name === newName) {
                if(person.number === newNumber) {
                    approved = false;
                    alert(`${newName} is already added to the phonebook`);
                } else {
                    approved = false;
                    personObject = {
                        name: newName,
                        number: newNumber,
                    };
                    idToUpdate = person.id; 
                }
            }
        });
    
        if(approved) {
            const newContact = {
                name: newName,
                number: newNumber,
            };
            peopleService.create(newContact)
                .then(returnedPerson => {
                    setAddingName(newName);
                    setTimeout(() => {
                        setAddingName('')
                    }, 3000)
                    setPeople(people.concat(returnedPerson));
                    setNewName('');
                    setNewNumber('');
                })
                .catch(error => {
                    alert("The person couldn't be added.");
                    console.log(`Error: ${error}`);
                });
        } 
        else {
            if(idToUpdate !== 0) {
                let update = window.confirm(`Do you want to change the number of ${newName}?`);
                if(update) {
                    peopleService
                        .update(idToUpdate, personObject)
                        .then(returnedPerson => {
                            setPeople(people.map(person => 
                                person.id !== idToUpdate ? person : returnedPerson
                            ));
                            setNewName('');
                            setNewNumber('');
                        })
                        .catch(error => {
                            alert("The person couldn't be updated.");
                            console.log(`Error: ${error}`);
                        });
                }
            }
        }
    };
    

    const handleDeletePerson = (idPerson) => {
        let del = window.confirm("Do you really want to delete this contact? ");
        if(del){
            peopleService
                .deletePerson(idPerson)
                .then(response =>{
                    console.log(response)
                    alert('Contact deleted successfully!')
                    setPeople(people.filter(person => person.id !== idPerson));
                })
                .catch(error => {
                    console.log(`Error: ${error}`)
                    setErrorNotificacion("Error, this contact doesn't exist in the server....")
                    setTimeout(() => {
                        setErrorNotificacion('');
                        setPeople(people.filter(person => person.id !== idPerson));
                    }, 2000)
                })
        }
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

    useEffect(() => {
        if (filter) {
            setFilteredPeople(people.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())));
        } else {
            setFilteredPeople(people); 
        }
    }, [filter, people]);


    return (
        <div className='overflow-auto'>

            <NotificacionAdd name = {addingName} />
            <Notification message = {errorNotification} />

            <PeopleFilter filter = {handleFilterContacts} />    

            <PeopleForm 
                handleNameChange = {handleNameChange} 
                handleNumberChange = {handleNumberChange} 
                addNewContact={addNewContact}
            />


            <ul>
            {filteredPeople.map(person => 
                <Contact2 
                    name = {person.name} 
                    key = {person.id} 
                    idPerson = {person.id}
                    number = {person.number}
                    handleDeletePerson = {() => handleDeletePerson(person.id)}
                />
            )}
            </ul>
            

        </div>
    )
}

export default People2;