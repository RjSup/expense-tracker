// frontend/api/authService.ts -> sroutes/authService.ts
import type { AuthResponse, User } from "../../backend/types/user";

export const signup = async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
    }

    localStorage.setItem('token', data.token);
    return data;
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const res = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');

  localStorage.setItem('token', data.token);
  return data;
};

// fetch protected route
export const fetchDashboard = async (): Promise<{ message: string, user: User}> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const res = await fetch('http://localhost:3000/api/auth/dashboard', {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Dashboard fetch error:", data);
    throw new Error(data.message || 'Failed to fetch dashboard');
  }

  return data;
};
