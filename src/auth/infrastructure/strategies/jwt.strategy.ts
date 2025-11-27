import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PayloadDto } from '@/auth/application/dtos/payload.dto';
import { JWT_CONSTANTS } from '@/common/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_CONSTANTS.secret,
        });
    }

    async validate(payload: PayloadDto) {
        return { userId: payload.sub, username: payload.username };
    }
}