import { I18n } from './types';

export const i18nPt: I18n = {
	general: {
		back: 'voltar',
		ok: 'ok',
	},
	crud: {
		district: {
			title: 'Distritos',
			label: 'Descrição',
			modal: {
				delete: {
					title: 'Confirmação da eliminação do Distrito',
					button: {
						cancel: 'Cancelar',
						confirm: 'Confirmar',
					},
				},
				createOrUpdate: {
					title: 'Criar ou Editar Distrito',
					button: {
						cancel: 'Cancelar',
						confirm: 'Guardar',
					},
				},
			},
			action: {
				add: 'Adicionar',
				delete: 'Eliminar',
				edit: 'Editar',
				options: 'Opções',
			},
		},
		category: {
			title: 'Categorias de Jogos',
			label: 'Descrição',
			modal: {
				delete: {
					title: 'Confirmação da eliminação da Categoria',
					button: {
						cancel: 'Cancelar',
						confirm: 'Confirmar',
					},
				},
				createOrUpdate: {
					title: 'Criar ou Editar Categoria',
					button: {
						cancel: 'Cancelar',
						confirm: 'Guardar',
					},
				},
			},
			action: {
				add: 'Adicionar',
				delete: 'Eliminar',
				edit: 'Editar',
				options: 'Opções',
			},
		},
		users: {
			title: 'Utilizadores',
			label: '',
			id: {
				label: 'UserId',
			},
			email: {
				label: 'Email',
			},
			name: {
				label: 'Nome',
			},
			isAdminRole: {
				label: 'Administrador',
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
			title: 'Concelhos',
			label: '',
			description: {
				label: 'Concelho',
			},
			district: {
				label: 'Distrito',
			},
			modal: {
				delete: {
					title: 'Confirmação da eliminação do Concelho',
					button: {
						cancel: 'Cancelar',
						confirm: 'Confirmar',
					},
				},
				createOrUpdate: {
					title: 'Criar ou Editar Concelho',
					button: {
						cancel: 'Cancelar',
						confirm: 'Guardar',
					},
				},
			},
			action: {
				add: 'Adicionar',
				delete: 'Eliminar',
				edit: 'Editar',
				options: 'Opções',
			},
		},
	},
	login: {
		welcomeMessage: 'Olá de novo, {{username}}',
		title: 'Entrar',
		subtitle: 'Entra com a tua conta para gerires a plataforma',
		email: 'Email',
		emailPlaceholder: 'email@dominio.pt',
		password: 'Palavra-Passe',
		passwordPlaceholder: 'Introduz aqui a tua senha',
		remember: 'Lembrar de mim',
		forgot: 'Esqueceste a password?',
		signIn: 'Entrar',
		github: 'Github',
		google: 'Google',
	},
};
