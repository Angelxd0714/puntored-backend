import { User } from "../entities/user.entity";
import { PasswordService } from "@/common/utils/password.service";
import { Injectable } from "@nestjs/common";
@Injectable()
export class AuthDomainService {
    async validateUserPassword(user: User, password: string) {
       return PasswordService.comparePassword(password, user.passwordhash);
    }
}