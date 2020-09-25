import manageTranslations from 'react-intl-translations-manager';

manageTranslations({
	messagesDirectory: '../src/translations/extractedMessages',
	translationsDirectory: '../src/translations/locales/',
	languages: ['en'], // any language you need
});
