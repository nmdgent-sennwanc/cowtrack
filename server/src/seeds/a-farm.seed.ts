import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Farm } from '../entity/Farm';

  // farm.seed.ts
export default class CreateFarms implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Farm)().createMany(2);
  }
}