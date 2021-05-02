import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Event } from '../entity/Event';

  // farm.seed.ts
export default class CreateEvents implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Event)().createMany(200);
  }
}