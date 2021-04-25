import { HttpStatusCode, IHttp, ILogger, IRead } from "@rocket.chat/apps-engine/definition/accessors";
import { ISlashCommandPreviewItem, SlashCommandPreviewItemType } from "@rocket.chat/apps-engine/definition/slashcommands";

export class LookupWord {
    private readonly url = 'https://api.dictionaryapi.dev/api/v2/entries';

    public async lookup(logger: ILogger, http: IHttp, phase: string, read: IRead): Promise<Array<ISlashCommandPreviewItem>> {

        let word = phase.trim()
        const languageCode = await read.getEnvironmentReader().getSettings().getById('language');

        let meaningsArray = new Array()
        // make request to the API
        try {
            const response = await http.get(`${this.url}/${languageCode.value}/${word}`);

            if (response.statusCode !== HttpStatusCode.OK || !response.data) {
                logger.debug('Did not get a valid response', response);
                throw new Error('Unable to retrieve gifs.');
            }

            logger.debug('Here are the results : ', response.data);

            const meanings = response.data[0].meanings;

            const uuidv4 = () => {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }

            meaningsArray = meanings.map(m => {
                return {
                    id: uuidv4(),
                    type: SlashCommandPreviewItemType.TEXT,
                    value: `
                Definition: ${m.definitions[0].definition}
                `
                }
            })
        } catch (err) {
            console.log(err)
        }

        return meaningsArray

    }


}
