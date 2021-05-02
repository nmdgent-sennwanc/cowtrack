import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Cow } from "./Cow";

@Entity({ name: "event" })
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar"})
  eventname: string;

  @Column()
  date: Date;

  @ManyToOne((type) => Cow, (cow) => cow.id)
  cow: Cow;
}
