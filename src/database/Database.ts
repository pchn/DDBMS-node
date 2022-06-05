import { Words } from "../entity/words";
import { createConnection, getConnection } from "typeorm";
import { WordEntity } from "../node/types";

export class Database {
    conn: any

    static saveWord = (wordEntity: WordEntity, fragmentId: number) => {
        let entity = new Words()

        entity.numberInDictionary = wordEntity.numberInDictionary
        entity.word = wordEntity.word
        entity.fragmentId = fragmentId

        entity.save()
    }

    constructor() {
        this.conn = createConnection().then(it => it);
    }
}