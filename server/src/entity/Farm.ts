import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Anchor } from "./Anchor";
import { Cow } from "./Cow";

@Entity({ name: "farm" })
export class Farm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  farmname: string;

  @Column({ type: "varchar" })
  farmowner: string;

  @Column({type: "double", nullable: true,})
  farmWidth: number;

  @Column({type: "double", nullable: true,})
  farmLength: number;

  @OneToMany((type) => Cow, (cow) => cow.id)
  cows: Cow[];

  @OneToMany((type) => Anchor, (anchor) => anchor.id)
  anchors: Anchor[];
}
