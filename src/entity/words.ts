import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Words extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    numberInDictionary: number;

    @Column("text")
    word: string;

    @Column()
    fragmentId: number;

    static findWord(numberInDictionary: number): Promise<Words> {
        return this
            .createQueryBuilder()
            .where("numberInDictionary = :numberInDictionary", {numberInDictionary})
            .printSql()
            .getOne()
    }

}