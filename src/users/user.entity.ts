import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 255, unique: true })
  username: string

  @Column({ length: 255 })
  password: string

  @Column({ type: 'timestamp' })
  createdAt: Date

  @Column({ type: 'timestamp' })
  updatedAt: Date
}
