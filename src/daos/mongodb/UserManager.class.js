import { userModel } from "./models/users.model.js";

export default class UserManager {
  async addUser(user) {
    try {
      let result = await userModel.create(user)

      return result
    }
    catch(error) {
      throw new Error("Usuario no fue creado")
    }
  }

  async findUser(email, password) {
    let result = await userModel.findOne({email: email, password: password})

    return result
  }
}