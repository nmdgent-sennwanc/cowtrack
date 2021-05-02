import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, JoinColumn} from "typeorm";
import { Event } from "./Event";
import { Farm } from "./Farm";

@Entity({ name: "cow" })
export class Cow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  cownumber: number;

  @Column({nullable: true,})
  latest_visit: Date;

  @Column({type: "double", nullable: true,})
  milk_yield: number;

  @Column({ type: "varchar", nullable: true,})
  state: string;

  @ManyToOne((type) => Farm, (farm) => farm.id)
  farm: Farm;

  @OneToMany((type) => Event, (event) => event.id)
  events: Promise<Event[]>;
}
