import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserService } from '../user.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly jwtSecret = 'your-secret-key'; // Replace with your own secret key

  constructor(private userService: UserService) {}

  async signIn(username: string, password: string, res: any): Promise<void> {
    const user = await this.userService.findUserByUsername(username);

    if (!user) {
      throw new Error('User does not exist');
    }

    if (user.password !== password) {
      throw new Error('Password is incorrect');
    }

    const token = this.generateToken(user); // Generate a JWT for the user

    res.cookie('token', token, {
      expires: new Date(Date.now() + 3600000), // Cookie will expire in 1 hour
      secure: process.env.NODE_ENV !== 'development', // Use HTTPS in production
      httpOnly: true,
    });

    res.cookie('userId', user.id, {
      expires: new Date(Date.now() + 3600000), // Cookie will expire in 1 hour
      secure: process.env.NODE_ENV !== 'development', // Use HTTPS in production
      httpOnly: false, // Allow client-side access to the userId cookie
    });

    res.json({ message: 'User authenticated successfully' });
  }

  async logout(res: any): Promise<void> {
    res.clearCookie('token');
    res.clearCookie('userId');
  }

  private generateToken(user: User): string {
    const payload = { userId: user.id, username: user.userName }; // Include userId in the payload
    const options = { expiresIn: '1h' }; // Set token expiration time as desired

    return jwt.sign(payload, this.jwtSecret, options); // Generate and return the token
  }
}
