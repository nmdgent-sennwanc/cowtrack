import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import { Cow } from "./Cow";

@Entity({ name: "tag" })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double'})
  coordinate_X: number;

  @Column({ type: 'double'})
  coordinate_Y: number;

  @Column({ type: 'double'})
  coordinate_Z: number;

  @OneToOne((type) => Cow, (cow) => cow.id)
  @JoinColumn()
  cow: Cow;
}
