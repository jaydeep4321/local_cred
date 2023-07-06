import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/modules/users/user.entity';

@Table
export class Transaction extends Model<Transaction> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
  })
  revceiverId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  given: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  taken: number;
}
