import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    return axios
      .get(baseUrl)
      .then(res => res.data);
}

const create = newObject => {
    return axios
      .post(baseUrl, newObject)
      .then(res => res.data);
}

const deleteOne = objectToDelete => {
    return axios
      .delete(`${baseUrl}/${objectToDelete.id}`)
}

const update = (objectToUpdate, newObject) => {
    return axios
      .put(`${baseUrl}/${objectToUpdate.id}`, newObject)
      .then(res => res.data)
}

export default {
    getAll,
    create,
    deleteOne,
    update
}
