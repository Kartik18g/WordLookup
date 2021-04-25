import {
    IAppAccessors,
    IConfigurationExtend,
    IEnvironmentRead,
    ILogger,
} from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";
import { IAppInfo } from "@rocket.chat/apps-engine/definition/metadata";
import { SettingType } from "@rocket.chat/apps-engine/definition/settings";
import { WordLookupCommand } from "./commands/WordLookupCommand";
import { settings } from './config/Settings'
import { LookupWord } from "./helpers/LookupWord";

export class WordLookupApp extends App {

    private lookupWord: LookupWord;


    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
        this.lookupWord = new LookupWord();
    }

    public getWordLookup(): LookupWord {
        return this.lookupWord;
    }

    protected async extendConfiguration(
        configuration: IConfigurationExtend,
        environmentRead: IEnvironmentRead
    ): Promise<void> {
        await configuration.slashCommands.provideSlashCommand(
            new WordLookupCommand(this)
        );

        await Promise.all(settings.map((setting) => configuration.settings.provideSetting(setting)));

    }
}
