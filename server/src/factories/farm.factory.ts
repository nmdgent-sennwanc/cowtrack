import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Farm } from '../entity/Farm';

define(Farm, (faker: typeof Faker) => {
    const farmname = faker.company.companyName();
    const farmowner = faker.name.firstName();
   
    const farm = new Farm();
    farm.farmname = farmname;
    farm.farmowner = farmowner;

    return farm;
});