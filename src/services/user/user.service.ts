import bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { getConnection } from 'typeorm';
import { UserEntity } from '../../entity/user.entity';
import { GeneralException } from '../../exceptions/generalException';
import { User } from '../../models/user';
import { UserRepository } from '../../repository/user.repository';

export class UserService {
  private userRepository: UserRepository;
  private readonly SALT_ROUND = 10;

  constructor() {
    this.userRepository =
      getConnection('warehouse').getCustomRepository(UserRepository);
  }

  async createUser(user: User) {
    const userForSave = plainToClass(UserEntity, user);
    try {
      userForSave.password = bcrypt.hashSync(user.password, this.SALT_ROUND);
      return this.userRepository.save(userForSave).catch(error => {
        throw new GeneralException(
          `Error creating user: ${error.message}`,
          500
        );
      });
    } catch (error: any) {
      throw new GeneralException(
        `Error generating password, Error: ${error.message}`,
        404
      );
    }
  }
}
