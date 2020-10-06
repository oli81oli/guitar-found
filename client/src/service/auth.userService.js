import axios from 'axios'

class AuthUserService {

    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    signup = user => this.api.post('/signup', user)
    login = user => this.api.post('/login', user)
    logout = () => this.api.post('/logout')
    isLoggedIn = () => this.api.get('/loggedin')

    updateUser = (id, user) => this.api.put(`/update-user/${id}`, user)
    deleteUser = id => this.api.get(`/delete-user/${id}`)
}
export default AuthUserService