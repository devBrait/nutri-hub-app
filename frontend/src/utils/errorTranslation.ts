const errorDictionary: Record<string, string> = {
	NAME_REQUIRED: "O nome é obrigatório.",
	NAME_INVALID_LENGTH: "O nome deve ter entre 2 e 100 caracteres.",
	EMAIL_REQUIRED: "O e-mail é obrigatório.",
	EMAIL_INVALID_FORMAT: "Formato de e-mail inválido.",
	PASSWORD_REQUIRED: "A senha é obrigatória.",
	PASSWORD_TOO_SHORT: "A senha deve ter pelo menos 8 caracteres.",
	PASSWORD_MISSING_UPPERCASE: "A senha deve conter pelo menos uma letra maiúscula.",
	PASSWORD_MISSING_LOWERCASE: "A senha deve conter pelo menos uma letra minúscula.",
	PASSWORD_MISSING_NUMBER: "A senha deve conter pelo menos um número.",
	ROLE_INVALID: "Perfil inválido.",
	EMAIL_ALREADY_REGISTERED: "Este e-mail já está cadastrado.",
	INVALID_CREDENTIALS: "E-mail ou senha incorretos.",
};

export function translateError(code: string): string {
	return errorDictionary[code] ?? "Ocorreu um erro inesperado. Tente novamente.";
}
