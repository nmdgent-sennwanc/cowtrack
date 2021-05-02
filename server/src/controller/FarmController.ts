import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Farm} from "../entity/Farm";

export class FarmController {

    private farmRepository = getRepository(Farm);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.farmRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
  
        return this.farmRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.farmRepository.save(request.body);
    }

    async update(request: Request, response: Response, next: NextFunction) {
        return this.farmRepository.update(request.body.farmId, { farmWidth: request.body.farmWidth , farmLength: request.body.farmLength}); 
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let farmToRemove = await this.farmRepository.findOne(request.params.id);
        await this.farmRepository.remove(farmToRemove);
    }

}