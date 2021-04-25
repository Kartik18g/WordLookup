import { ISetting, SettingType } from '@rocket.chat/apps-engine/definition/settings';



export const settings: Array<ISetting> = [
    {
        id: "language",
        i18nLabel: "Language ",
        i18nDescription: "Select Language",
        required: true,
        type: SettingType.SELECT,
        public: true,
        packageValue: {
            key: "en_US",
            i18nLabel: "English(US)",
        },
        values: [
            {
                key: "en_US",
                i18nLabel: "English(US)",
            },
            {
                key: "en_GB",
                i18nLabel: "English(UK)",
            },
            {
                key: "hi",
                i18nLabel: "Hindi",
            },
            {
                key: "es",
                i18nLabel: "Spanish",
            },
            {
                key: "fr",
                i18nLabel: "French",
            },
            {
                key: "ja",
                i18nLabel: "Japanese",
            },
            {
                key: "ru",
                i18nLabel: "Russian",
            },
            {
                key: "de",
                i18nLabel: "German",
            },
            {
                key: "it",
                i18nLabel: "Italian",
            },
            {
                key: "ar",
                i18nLabel: "Arabic",
            },
            {
                key: "tr",
                i18nLabel: "Turkish",
            },
        ],
    }
];
