import { UsersRepository } from "@/repositories/users-repository"
import bcrypt  from 'bcryptjs'
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { User } from "@prisma/client"

interface RegisterRequest {
  name: string
  email: string
  password: string
}

interface RegisterResponse {
  user: User
}

export class RegisterUseCase {
  constructor (private usersRepository: UsersRepository) {}

  async execute({ 
    name, 
    email, 
    password 
  }: RegisterRequest): Promise<RegisterResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
  
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
  
    const password_hash = await bcrypt.hash(password, 6)
  
    const user = await this.usersRepository.create({
      name, 
      email, 
      password_hash
    })

    return {
      user,
    }
  }

}