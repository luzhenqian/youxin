import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Account, AccountDocument } from './schemas/account.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  async create(createAuthDto: CreateAuthDto): Promise<Account> {
    const createdAccount = new this.accountModel(createAuthDto);
    return createdAccount.save();
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

  async findOne(id: string): Promise<Account> {
    return this.accountModel.findById(id);
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    return this.accountModel.findByIdAndUpdate(id, updateAuthDto);
  }

  async remove(id: string) {
    return this.accountModel.findByIdAndRemove(id);
  }
}
