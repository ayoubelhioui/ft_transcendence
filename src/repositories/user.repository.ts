import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/entities';
import { UserDto } from 'src/dto/user.dto';

// @EntityRepository(User)
// export class UserRepository extends Repository<User>{ }
