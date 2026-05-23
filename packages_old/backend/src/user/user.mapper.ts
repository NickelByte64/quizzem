import { UserDto } from 'src/user/dto/user.dto';
import { UserModel } from 'src/user/model/user.model';

export class UserMapper {
  static toDto(user: UserModel): UserDto {
    return {
      id: user.id,
      createdAt: user.createdAt,
      userName: user.userName,
    };
  }

  static toDtoList(users: UserModel[]): UserDto[] {
    return users.map((user) => this.toDto(user));
  }
}
