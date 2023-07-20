import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor() {
    super({
      clientID: 'u-s4t2ud-a03da0e6296d63a6c503040864e2f87ed71295125a6d30ac9b58b101c977867e',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/callback',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    return (profile);
  }
}