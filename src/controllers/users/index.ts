import { Request, Response, NextFunction } from 'express';

import validateReq from '../validator';

import usersProvider from './provider';
import authProvider from '../auth/provider';

import { UserFilterDto, CreateUserDto, UpdateUserDto } from './interfaces';

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    validateReq(req, 422, 'Incorrect CreateUserDto', next);

    const createUserDto: CreateUserDto = req.body;

    createUserDto.password = await authProvider.createPasswordHash(
      createUserDto.password
    );
    const user = await usersProvider.createUser(createUserDto);

    return res.status(201).json(user);
  } catch (e) {
    return next(e);
  }
}

async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    validateReq(req, 422, 'Incorrect UserFilterDto', next);

    const userFilterDto: UserFilterDto = req.query;

    const user = await usersProvider.getUsers(userFilterDto);

    return res.json(user);
  } catch (e) {
    return next(e);
  }
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    validateReq(req, 422, 'Incorrect UpdateUserDto, or id', next);

    const { id: userId = 0 } = req.query;
    const updateUserDto: UpdateUserDto = req.body;

    if (updateUserDto.password) {
      updateUserDto.password = await authProvider.createPasswordHash(
        updateUserDto.password
      );
    }
    const user = await usersProvider.updateUser(+userId, updateUserDto);

    return res.json(user);
  } catch (e) {
    return next(e);
  }
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    validateReq(req, 422, 'Incorrect user ID', next);

    const { id: userId = 0 } = req.query;

    const user = await usersProvider.deleteUser(+userId);

    return res.json(user);
  } catch (e) {
    return next(e);
  }
}

export default { createUser, getUsers, updateUser, deleteUser };
