import { Database } from "../database/Database"
import { ip, dispatcher, logger } from "../index"
import { WordEntity } from "./types"
import fetch from "node-fetch"

export class Node {
    public static nodeId: number

    static saveWords = async (wordEntities: WordEntity[]) => {
        let content = {
            "storingNodeId": Node.nodeId
        }

        let url = dispatcher + "/api/newFragment"

        for(let wordEntity of wordEntities) {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(content),
                headers: { 'Content-Type': 'application/json' }
            })

            let asJSON = await response.json()

            logger.debug(
                "Saving new word:\n\tword: " + wordEntity.word + 
                "\n\tnumber in dictionary: " + wordEntity.numberInDictionary + 
                "\n\tfragment id: " + asJSON["fragmentId"]
            )

            Database.saveWord(wordEntity, asJSON["fragmentId"])
        }
    }

    static init = async () => {
        let content = {
            "ip": ip
        }

        let url = dispatcher + "/api/newNode"

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(content),
            headers: { 'Content-Type': 'application/json' }
        })

        let asJSON = await response.json()
        Node.nodeId = asJSON["nodeId"]
        logger.debug("Node id:", Node.nodeId)
    }

}