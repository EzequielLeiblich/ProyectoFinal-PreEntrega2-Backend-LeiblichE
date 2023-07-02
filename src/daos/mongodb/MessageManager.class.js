import mongoose from 'mongoose'
import { messageModel } from './models/message.model.js'

export default class MessageManager {
    connection = mongoose.connect('mongodb+srv://ezequielleiblich:1Q2w3e4r@leibliche.nmve4kb.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Conexión exitosa a MongoDB Atlas'))
    .catch((err) => console.error('Error al conectarse a MongoDB Atlas:', err))

    async agregarMessage (message) {
        const { user, message: text } = message; // Extrae los valores de user y message
        const msg = { user, message: text }; // Asigna los valores extraídos al objeto msg
        let result = await messageModel.create(msg) 
        return result;
    }

    async obtenerMessages () {
        let result = await messageModel.find()
        return result
    }
}