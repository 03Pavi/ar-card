import {DataSource, Repository } from 'typeorm';
import { User } from 'src/domain/user/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async createOrUpdateUser(id: string | null, name: string, email: string,password:string): Promise<User> {
    let user: User;
    if (id) {
      user = await this.findOne({ where: { id } });
      if (!user) throw new Error('User not found');
      user.name = name;
      user.email = email;
      user.password=  password
    } else {
      user = this.create({ name, email,password });
    }

    return this.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ where: { email } });
  }

  async findById(userId: string): Promise<User | undefined> {
    return this.findOne({ where: { id: userId } });
  }
}
