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

export interface I18n {
	general: {
		ok: string;
		back: string;
	};
	crud: {
		district: I18nCrud;
	};
}
