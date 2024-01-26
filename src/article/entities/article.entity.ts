import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'articles'})
export class Article {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({ type: 'int4' })
  userId: number

  @Column({ length: 255 })
  title: string

  @Column({ type: 'text' })
  description: string

  @Column({ length: 255 })
  topic: string

  @Column({ type: 'timestamp' })
  publishedAt: Date

  @Column({ type: 'timestamp' })
  createdAt: Date

  @Column({ type: 'timestamp' })
  updatedAt: Date
}
