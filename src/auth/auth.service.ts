/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';

@Injectable()
export class AuthService {

    constructor(private readonly usersRepository: UsersRepository) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;
        const user = this.usersRepository.create({ username, password })
        await this.usersRepository.save(user)
    }
}
