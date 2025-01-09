import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
      id: 1000000,
      name: 'This person is not saved to the server. ',
      number: 'Non existing number',
    }
    return request.then(response => response.data.concat(nonExisting))    
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deletePerson = idPerson => {
  const request = axios.delete(`${baseUrl}/${idPerson}`)
  return request.then(response => response.data)
}

const update = (id, object) => {
  console.log(`This ${baseUrl}/${id}/${object}`)
  const request = axios.put(`${baseUrl}/${id}`, object)
  return request.then(response => response.data)
}

export default { getAll, create, deletePerson, update }