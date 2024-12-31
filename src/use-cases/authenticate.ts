import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateRequest {
  email: string
  password: string
}

interface AuthenticateResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: AuthenticateRequest) : Promise<AuthenticateResponse> {
    // authentication
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError
    }

    const doesPasswordMatches = await bcrypt.compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError
    }

    return {
      user,
    }
  }
}