export interface I18nCrudModal {
	title: string;
	button: {
		cancel: string;
		confirm: string;
	};
}

export interface I18nCrud {
	title: string;
	label: string;
	modal: {
		delete: I18nCrudModal;
		createOrUpdate: I18nCrudModal;
	};
	action: {
		add: string;
		edit: string;
		delete: string;
		options: string;
	};
}

export interface UserCrud extends I18nCrud {
	id: {
		label: string;
	};
	email: {
		label: string;
	};
	name: {
		label: string;
	};
	isAdminRole: {
		label: string;
	};
}

export interface CountyCrud extends I18nCrud {
	description: {
		label: string;
	};
	district: {
		label: string;
	};
}

export interface I18n {
	general: {
		ok: string;
		back: string;
	};
	crud: {
		district: I18nCrud;
		gameType: I18nCrud;
		users: UserCrud;
		county: CountyCrud;
	};
	login: {
		welcomeMessage: string;
		title: string;
		subtitle: string;
		email: string;
		emailPlaceholder: string;
		password: string;
		passwordPlaceholder: string;
		remember: string;
		forgot: string;
		signIn: string;
		github: string;
		google: string;
	};
}
