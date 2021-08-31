import bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';
import { GeneralException } from '../../exceptions/generalException';
import { createToken } from '../../lib/token';
import { User } from '../../models/user';
import { UserRepository } from '../../repository/user.repository';
import { UserService } from '../user/user.service';

export class AuthService {
  private userService: UserService;
  private userRepository: UserRepository;

  constructor() {
    this.userService = new UserService();
    this.userRepository =
      getConnection('warehouse').getCustomRepository(UserRepository);
  }

  async singIn(email: string, password: string) {
    const user = await this.userRepository.find({
      where: {
        email: email,
      },
    });
    if (!user[0]) throw new GeneralException('User not found', 404);
    if (bcrypt.compareSync(password, user[0].password)) {
      return createToken({ userId: user[0].id, userRole: user[0].role });
    } else {
      throw new GeneralException('Invalid password', 403);
    }
  }

  async singUp(user: User) {
    const userCreated = await this.userService.createUser(user);
    return createToken({ userId: userCreated.id, userRole: userCreated.role });
  }
}
