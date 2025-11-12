// frontend/api/authService.ts -> backend/routes/auth.ts
export const signup = async (email: string, password: string) => {
    const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Failed to sign up');
    }

    return response.json();     
}
