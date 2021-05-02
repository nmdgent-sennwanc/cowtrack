import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Cow } from '../entity/Cow';
import { Farm } from '../entity/Farm';

define(Cow, (faker: typeof Faker) => {
    const cownumber = faker.random.number(5000);
    const latest_visit = faker.date.between('2021-03-01', '2021-04-02');
    const milk_yield = faker.random.number(40);
    const state = faker.random.arrayElement(["Gemolken","Op te halen","Zelfde plaats","Geen status"]);

    const farm = new Farm();
    farm.id =  Math.round(Math.random() * 1 ) + 1;
 
    const cow = new Cow();
    cow.cownumber = cownumber;
    cow.latest_visit = latest_visit;
    cow.milk_yield = milk_yield;
    cow.state = state;
    cow.farm = farm;

    return cow;
});