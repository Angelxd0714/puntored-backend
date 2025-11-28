import { UserRepository } from "./repository.interfaces";
import { User } from "@/auth/domain/entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
    
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    
    findByUsername(username: string): Promise<User | null> {
        return this.userRepository.findOneBy({ username });
    }
    save(user: User): Promise<User> {
        return this.userRepository.save(user);
    }
}