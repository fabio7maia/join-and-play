import { I18n } from './types';

export const i18nEn: I18n = {
	general: {
		back: 'Back',
		ok: 'ok',
	},
	crud: {
		district: {
			title: 'Districts',
			label: 'Description',
			modal: {
				delete: {
					title: 'Confirmation of District Delete',
					button: {
						cancel: 'Cancel',
						confirm: 'Confirm',
					},
				},
				createOrUpdate: {
					title: 'Create or Edit District',
					button: {
						cancel: 'Cancel',
						confirm: 'Save',
					},
				},
			},
			action: {
				add: 'Add',
				delete: 'Delete',
				edit: 'Edit',
				options: 'Options',
			},
		},
		gameType: {
			title: 'Game Category',
			label: 'Description',
			modal: {
				delete: {
					title: 'Confirmation of District Delete',
					button: {
						cancel: 'Cancel',
						confirm: 'Confirm',
					},
				},
				createOrUpdate: {
					title: 'Create or Edit Category',
					button: {
						cancel: 'Cancel',
						confirm: 'Save',
					},
				},
			},
			action: {
				add: 'Add',
				delete: 'Delete',
				edit: 'Edit',
				options: 'Options',
			},
		},
		users: {
			title: 'Users',
			label: '',
			id: {
				label: 'UserId',
			},
			email: {
				label: 'Email',
			},
			name: {
				label: 'Name',
			},
			isAdminRole: {
				label: 'Administrator',
			},
			modal: {
				delete: {
					title: '',
					button: {
						cancel: '',
						confirm: '',
					},
				},
				createOrUpdate: {
					title: '',
					button: {
						cancel: '',
						confirm: '',
					},
				},
			},
			action: {
				add: '',
				delete: '',
				edit: '',
				options: '',
			},
		},
		county: {
			title: 'County',
			label: '',
			description: {
				label: 'County',
			},
			district: {
				label: 'District',
			},
			modal: {
				delete: {
					title: 'Confirmation of County Delete',
					button: {
						cancel: 'Cancel',
						confirm: 'Confirm',
					},
				},
				createOrUpdate: {
					title: 'Create or Edit County',
					button: {
						cancel: 'Cancel',
						confirm: 'Save',
					},
				},
			},
			action: {
				add: 'Add',
				delete: 'Delete',
				edit: 'Edit',
				options: 'Options',
			},
		},
	},
	login: {
		welcomeMessage: 'Hello again, {{username}}',
		title: 'Sign In',
		subtitle: 'Login with your account to manage the platform',
		email: 'Email',
		emailPlaceholder: 'mail@doamin.pt',
		password: 'Password',
		passwordPlaceholder: 'Enter email here',
		remember: 'Remember me',
		forgot: 'Forgot your password?',
		signIn: 'Sign In',
		github: 'Github',
		google: 'Google',
	},
};
