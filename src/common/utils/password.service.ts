import * as bcrypt from 'bcrypt';

export class PasswordService {
  static async hashPassword(plain: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(plain, saltRounds);
  }

  static async comparePassword(plain: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plain, hash);
  }
}
