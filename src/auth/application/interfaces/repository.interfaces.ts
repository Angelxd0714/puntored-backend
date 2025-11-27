import { User } from "@/auth/domain/entities/user.entity";

export interface UserRepository {
     findByUsername(username: string): Promise<User | null>;
     save(user: User): Promise<User>;
}