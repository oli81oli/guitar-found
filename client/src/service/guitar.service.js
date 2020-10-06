import axios from 'axios'

class GuitarService {

    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getAllGuitars = () => this.api.get('/getAllGuitars')
    getOneGuitar = id => this.api.get(`/getOneGuitar/${id}`)
    createNewGuitar = guitar => this.api.post('/newGuitar', guitar)
    editGuitar = (id, guitar) => this.api.put(`/editGuitar/${id}`, guitar)
    deleteGuitar = id => this.api.get(`/delete-guitar/${id}`)
}
export default GuitarService