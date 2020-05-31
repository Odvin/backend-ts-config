import { Request, Response, NextFunction } from 'express';

class CoursesController {
  async info(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json({ operation: 'Ok' });
    } catch (e) {
      return next(e);
    }
  }
}

export default new CoursesController();
