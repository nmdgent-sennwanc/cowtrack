import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Tag } from '../entity/Tag';

define(Tag, (faker: typeof Faker) => {
    const coordinate_X = Math.random() * 40;
    const coordinate_Y = Math.random() * 100;
    const coordinate_Z = Math.random() + 1;

    const tag = new Tag();
    tag.coordinate_X = coordinate_X;
    tag.coordinate_Y = coordinate_Y;
    tag.coordinate_Z = coordinate_Z;

    return tag;
});