const manageTranslations = require('react-intl-translations-manager').default;

manageTranslations({
	messagesDirectory: 'locales/default',
	translationsDirectory: 'locales/lang',
	whitelistsDirectory: 'locales/whitelists',
	languages: ['fr', 'ar'],
});
