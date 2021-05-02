import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Cow } from '../entity/Cow';
import { Tag } from '../entity/Tag';

  // cow.seed.ts
export default class CreateCows implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    
    await factory(Tag)()
    .map(async (tag: Tag) => {
      const cow: Cow = await factory(Cow)().create()
      tag.cow = cow;
      return tag;

    }).createMany(60);

  }
}

