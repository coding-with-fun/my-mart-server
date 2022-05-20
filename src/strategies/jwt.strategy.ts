import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { signInUserRequestType } from 'src/types/requests/auth.request';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: '7x@$LCr^h#u*SSB%wbW%',
        });
    }

    async validate(payload: signInUserRequestType) {
        return {
            id: payload.id,
        };
    }
}
