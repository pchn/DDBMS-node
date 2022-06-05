import { Body, Get, JsonController, Post } from "routing-controllers"
import { findWordRequestDto, findWordResponseDto } from "../dto/findWord"
import { Words } from "../entity/words"
import { addWordsRequestDto } from "../dto/addWords"
import { Node } from "../node/Node"

@JsonController()
export class Rest {

    @Post('/api/addWords')
    newNode(@Body() json: addWordsRequestDto) {
        Node.saveWords(json.wordEntities).then(it => it)
    }

    @Get('/api/findWord')
    async findWord(@Body() json: findWordRequestDto) : Promise<findWordResponseDto> {
        let response = await Words.findWord(json.numberInDictionary)
        return { word: response.word }
    }
}
