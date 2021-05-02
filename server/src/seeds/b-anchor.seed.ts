import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Anchor } from '../entity/Anchor';

  // anchor.seed.ts
export default class CreateAnchors implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Anchor)().createMany(3);
  }
}