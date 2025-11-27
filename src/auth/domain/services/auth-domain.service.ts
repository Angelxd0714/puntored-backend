import { User } from "../entities/user.entity";
import { PasswordService } from "@/common/utils/password.service";
import { Injectable } from "@nestjs/common";
import { Credentials } from '../value-objects/credentials.vo';
@Injectable()
export class AuthDomainService {
    
    async validateCredentials(credentials: Credentials, user: User): Promise<boolean> {
        return await PasswordService.comparePassword(credentials.password, user.passwordhash);
    }
}