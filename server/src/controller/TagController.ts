import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Tag} from "../entity/Tag";

export class TagController {

    private tagRepository = getRepository(Tag);

    async all(request: Request, response: Response, next: NextFunction) {
        const farmId = request.query.farmId;
        const status = request.query.status;

        return status !== 'undefined' ? await this.tagRepository.createQueryBuilder('tag').leftJoinAndSelect('tag.cow', 'cow').where("farmId = :id", { id: farmId }).andWhere("state = :state", {state: status}).getMany() :
        await this.tagRepository.createQueryBuilder('tag').leftJoinAndSelect('tag.cow', 'cow').where("farmId = :id", { id: farmId }).getMany();
    }

    async emptytags(request: Request, response: Response, next: NextFunction) {
        return this.tagRepository.createQueryBuilder('tag')
        .where("cowId is null")
        .getMany();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const cowId = request.query.cowId;
        const farmId = request.query.farmId;

        return this.tagRepository.createQueryBuilder('tag')
        .leftJoinAndSelect('tag.cow', 'cow')
        .where("cowId = :cowId", {cowId: cowId})
        .andWhere("farmId = :farmId", {farmId: farmId})
        .getMany();
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.tagRepository.save(request.body);   
    }

    async update(request: Request, response: Response, next: NextFunction) {
        return this.tagRepository.update(request.body.tagId, { cow: request.body.cowId }); 
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let tagToRemove = await this.tagRepository.findOne(request.params.id);
        await this.tagRepository.remove(tagToRemove);
    }

}