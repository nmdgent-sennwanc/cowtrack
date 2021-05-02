import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Anchor } from '../entity/Anchor';
import { Farm } from '../entity/Farm';

define(Anchor, (faker: typeof Faker) => {

    const temp = faker.random.boolean();
    const UUID = faker.random.uuid();
    let coordinate_X = 0;
    let coordinate_Y = 0;
    let coordinate_Z = 0;
    const farm = new Farm();
    farm.id =  1;


    if(temp === true) {
        coordinate_X = 0;
        coordinate_Y = Math.random() * 50;
        coordinate_Z = 0;
    } else {
        coordinate_X = Math.random() * 20;
        coordinate_Y = 0;
        coordinate_Z = 0;
    }

    const anchor = new Anchor();
    anchor.UUID = UUID;
    anchor.coordinate_X = coordinate_X;
    anchor.coordinate_Y = coordinate_Y;
    anchor.coordinate_Z = coordinate_Z;
    anchor.farm = farm;
    
    return anchor;
});