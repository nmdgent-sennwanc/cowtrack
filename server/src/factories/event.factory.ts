import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Cow } from '../entity/Cow';
import { Event } from '../entity/Event';

define(Event, (faker: typeof Faker) => {
    
    const eventname = faker.random.arrayElement(["In melkrobot","Aan voederhek"]);
    const date = faker.date.between('2021-03-01', '2021-04-02');
    
    const cow = new Cow();
    cow.id =  Math.round(Math.random() * 59 ) + 1;

    const event = new Event();
    event.eventname = eventname;
    event.date = date;
    event.cow = cow;

    return event;
});