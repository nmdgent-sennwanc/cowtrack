import {EntityNotFoundError, getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Cow} from "../entity/Cow";

export class CowController {

    private cowRepository = getRepository(Cow);

    async all(request: Request, response: Response, next: NextFunction) {
        const farmId = request.query.farmId;

        return this.cowRepository.createQueryBuilder('cow')
        .andWhere("farmId = :id", { id: farmId })
        .orderBy('cownumber', 'ASC')
        .getMany();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const cownumber = request.params.cownumber;
        const farmId = request.query.farmId;
                    
        try {
            const resp = await this.cowRepository.createQueryBuilder('cow')
            .where("cownumber = :cownumber", { cownumber: cownumber })
            .andWhere("farmId = :id", { id: farmId })
            .getOneOrFail();
            
            return resp;
            
        } catch (error) {
            response.status(404).send({
                message: 'could not find entity'
            });
        }        
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try {
            const resp = await this.cowRepository.save(request.body);

            return resp; 

        } catch (error) {
            response.status(409).send({
                message: 'entity already exists'
            });
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let cowToRemove = await this.cowRepository.findOne(request.params.cowId);
        await this.cowRepository.remove(cowToRemove);
    }

}