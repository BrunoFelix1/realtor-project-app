const API_URL = import.meta.env.VITE_API_URL;

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao fazer login');
  }
  return response.json();
}

export async function register(name: string, email: string, password: string, role: string) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password, role }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao registrar usuário');
  }
  return response.json();
}
