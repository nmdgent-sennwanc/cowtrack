import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Event} from "../entity/Event";

export class EventController {

    private eventRepository = getRepository(Event);

    async all(request: Request, response: Response, next: NextFunction) {
        const sortFilter = request.query.sort;
        const limit = request.query.limit;
        const farmId = request.query.farmId;
        const cownumber = request.query.cownumber;
        const eventname = request.query.eventname;
        const datetime = request.query.datetime;

        return this.eventRepository.createQueryBuilder('event')
        .leftJoinAndSelect('event.cow', 'cow')
        .orderBy(sortFilter, "ASC")
        .addOrderBy('date', 'ASC')
        .where("farmId = :id", { id: farmId })
        .andWhere(cownumber ? `cownumber = :cownumber` : '1=1', { cownumber: cownumber })
        .andWhere(eventname ? `eventname = :eventname` : '1=1', { eventname: eventname })
        .andWhere(datetime ? `Date(date) = :datetime` : '1=1', { datetime: datetime })
        .limit(limit)
        .getMany();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.eventRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.eventRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let eventToRemove = await this.eventRepository.findOne(request.params.id);
        await this.eventRepository.remove(eventToRemove);
    }

}