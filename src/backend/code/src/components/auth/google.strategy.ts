import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // You'll need this for managing configuration

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALL_BACK, // Your callback URL
      passReqToCallback: true,
      scope: ['email', 'profile'],
    });
  }


  async validate( request: any, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { emails, displayName } = profile;

    const user = {
      email: emails[0].value,
      name: displayName,
    };
    return (user);
    // done(null, user);
  }
}

