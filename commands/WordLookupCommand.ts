import {
    IEnvironmentRead,
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    ISlashCommand,
    ISlashCommandPreview,
    SlashCommandContext,
    ISlashCommandPreviewItem,
    SlashCommandPreviewItemType,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { WordLookupApp } from "../WordLookupApp";

export class WordLookupCommand implements ISlashCommand {
    public command: string;
    public i18nParamsExample: string;
    public i18nDescription: string;
    public providesPreview: boolean;
    public readonly url = 'https://api.dictionaryapi.dev/api/v2/entries'


    constructor(private readonly app: WordLookupApp) {
        this.command = "define";
        this.i18nParamsExample = "";
        this.i18nDescription = "Looks up the meaning of a word for user";
        this.providesPreview = true;
    }

    public executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public async previewer(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<ISlashCommandPreview> {

        let items = await this.app
            .getWordLookup()
            .lookup(this.app.getLogger(), http, context.getArguments().join(" "), read);


        return {
            i18nTitle: "Lookup for: ",
            items,
        };
    }


    public async executePreviewItem(
        item: ISlashCommandPreviewItem,
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        console.log("--------->>>")
        console.log(item)
        console.log(context.getTriggerId())
        const builder = modify
            .getCreator()
            .startMessage()
            .setSender(context.getSender())
            .setRoom(context.getRoom());
        builder.setText(
            "An error occured when trying to send the gif :disappointed_relieved:"
        );

        modify
            .getNotifier()
            .notifyUser(context.getSender(), builder.getMessage());
    }


}
