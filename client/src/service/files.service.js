import axios from 'axios'

 class FileService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/files`,
            withCredentials: true
        })
    }

    uploadImage = imageForm => this.api.post('/upload', imageForm)
}

export default FileService