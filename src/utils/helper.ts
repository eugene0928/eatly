import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { bcryptSaltOrRounds } from './constants';
import { Logger } from '@nestjs/common';

const logger = new Logger('Helper');
export const jwtHelper = {
  sign(data: { email: string; isAdmin: boolean }) {
    return jwt.sign(data, process.env['JWT_KEY']);
  },

  verify(data: string) {
    try {
      return jwt.verify(data, process.env['JWT_KEY']);
    } catch (err) {
      return new Error(err);
    }
  },
};

export const bcryptHelper = {
  async hash(passwd: string): Promise<string> {
    return await bcrypt.hash(passwd, bcryptSaltOrRounds);
  },

  async isMatch(hashedPasswd: string, passwd: string): Promise<boolean> {
    try {
      return await bcrypt.compare(passwd, hashedPasswd);
    } catch (err) {
      return false;
    }
  },
};
