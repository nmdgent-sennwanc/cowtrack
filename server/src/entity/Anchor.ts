import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Farm } from "./Farm";

@Entity({ name: "anchor" })
export class Anchor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar"})
  UUID: string;

  @Column()
  coordinate_X: number;

  @Column()
  coordinate_Y: number;

  @Column()
  coordinate_Z: number;

  @ManyToOne((type) => Farm, (farm) => farm.id)
  farm: Farm;
}
