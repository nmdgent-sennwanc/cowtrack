import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Anchor} from "../entity/Anchor";

export class AnchorController {

    private anchorRepository = getRepository(Anchor);

    async all(request: Request, response: Response, next: NextFunction) {
        const farmId = request.query.farmId;     

        return this.anchorRepository.createQueryBuilder('anchor')
        .where("farmId = :farmId", {farmId: farmId})
        .getMany();
    }
    
    async one(request: Request, response: Response, next: NextFunction) {
        return this.anchorRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.anchorRepository.update(request.body.anchorId, { coordinate_X: request.body.X , coordinate_Y: request.body.Y});  
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let anchorToRemove = await this.anchorRepository.findOne(request.params.id);
        await this.anchorRepository.remove(anchorToRemove);
    }

}