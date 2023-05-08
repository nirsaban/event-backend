import { HttpStatus } from "../common/enums/errorCode.enum";
import { BadRequest, DBError } from "../common/errors/general.error";
import { UserDto } from "./users.dto";
import { UsersEntity } from "./users.entity";
import { UsersRepository } from "./users.repository";

export class UsersService {
  usersRepository: UsersRepository;
  constructor() {
    this.usersRepository = new UsersRepository();
  }
  public async getUserByFBId(fbUid: string): Promise<UserDto> {
    try {
      const result: UsersEntity = await this.usersRepository.getUserByFBID(fbUid);

      if (result) {
        return { ...result } as unknown as UserDto;
      }
    } catch (error) {
      throw new DBError(error);
    }
  }

  // Create new umo user if not exist , update user if exist except from devices and return the user.
  public async createOrUpdateUser(userDto: UserDto, userExist: boolean): Promise<UserDto> {
    let user: UserDto;

    // return only user without the relations
    if (userExist) {
      user = await this.updateUser(userDto);
    } else {
      user = await this.createUser(userDto);
    }

    return user;
  }

  // Update User by Id
  public async updateUser(userDto: UserDto): Promise<UserDto> {
    try {
      const userEntity: UsersEntity = userDto.toEntity();

      delete userEntity.events;

      await this.usersRepository.updateUser(userEntity, userEntity.id);

      return userDto.fromEntity();
    } catch (error) {
      throw new DBError(error);
    }
  }

  //Create new user and validate tuya Id
  public async createUser(userDto: UserDto): Promise<UserDto> {
    try {
      const userEntity: UsersEntity = userDto.toEntity();

      await this.usersRepository.createUser(userEntity);

      return userDto.fromEntity();
    } catch (error) {
      // handle tuya error
      if (error.status == HttpStatus.BAD_REQUEST) {
        throw new BadRequest(error.message);
      } else {
        throw new DBError(error);
      }
    }
  }
}
