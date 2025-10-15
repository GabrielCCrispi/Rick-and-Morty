import { User } from '../auth/user.entity';
import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';

@Entity('characters')
export class FavoriteCharacter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'original_character_id' })
    originalCharacterId: number;

    @Column()
    name: string;

    @Column()
    species: string;

    @Column()
    gender: string;

    @Column()
    origin: string;

    @Column()
    location: string;

    @Column()
    image: string;

    @Column()
    status: string;

    @ManyToOne(() => User, user => user.favoriteCharacters)

    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}