const errorDictionary: Record<string, string> = {
  "Email is required.": "O e-mail é obrigatório.",
  "Invalid email format.": "Formato de e-mail inválido.",
  "Password is required.": "A senha é obrigatória.",
  "Password must be at least 8 characters.": "A senha deve ter pelo menos 8 caracteres.",
  "Password must contain at least one uppercase letter.": "A senha deve conter pelo menos uma letra maiúscula.",
  "Password must contain at least one lowercase letter.": "A senha deve conter pelo menos uma letra minúscula.",
  "Password must contain at least one number.": "A senha deve conter pelo menos um número.",
  "Email already registered.": "Este e-mail já está cadastrado.",
  "Name is required.": "O nome é obrigatório.",
  "Name must be between 2 and 100 characters.": "O nome deve ter entre 2 e 100 caracteres.",
  "Invalid credentials.": "E-mail ou senha incorretos.",
  "Invalid email or password.": "E-mail ou senha incorretos.",
};

export function translateError(errorMsg: string): string {
  if (errorDictionary[errorMsg]) {
    return errorDictionary[errorMsg];
  }
  
  return errorMsg;
}
