
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3000/api/v1'; 

export default function AuthPage({ setToken, token }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [authMessage, setAuthMessage] = useState('Por favor, inicia sesión o regístrate.');
    
    // Estados de Registro
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [name, setName] = useState('');

    // Si el usuario ya tiene un token, redirigir a /products
    useEffect(() => {
        if (token) {
            navigate('/products');
        }
    }, [token, navigate]);

    // Manejar Registro (POST /auth/register)
    const handleRegister = async (e) => {
        e.preventDefault();
        setAuthMessage('Registrando usuario...');
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setAuthMessage(`Registro exitoso para ${name}. ¡Ahora inicia sesión!`);
                setIsRegisterMode(false); 
                setName('');
            } else {
                setAuthMessage(`Error de Registro: ${data.message || 'Error del servidor'}`);
            }
        } catch (error) {
            setAuthMessage('Error de conexión con el servidor al registrar.');
        }
    };

    // Manejar el inicio de sesión (POST /auth/login)
    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthMessage('Iniciando sesión...');
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setToken(data.token); // Establece el token y activa la redirección en useEffect
            } else {
                setToken(null);
                setAuthMessage(`Error de Login: ${data.message || 'Credenciales inválidas'}`);
            }
        } catch (error) {
            setAuthMessage('Error de conexión con el servidor.');
        }
    };
    
    return (
        <div className="auth-page-container">
            <header>
                <h1>Administradores - Reiss</h1>
                <p>Ingresa para acceder a la administración de productos.</p>
            </header>

            <section className="card login-section">
                <h2>{isRegisterMode ? 'Crear Cuenta (Register)' : 'Iniciar Sesión'}</h2>

                {/* --- Formularios --- */}
                {isRegisterMode ? (
                    <form onSubmit={handleRegister}>
                        <input type="text" placeholder="Nombre Completo" value={name} onChange={(e) => setName(e.target.value)} required />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit">Registrar</button>
                    </form>
                ) : (
                    <form onSubmit={handleLogin}>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit">Login</button>
                    </form>
                )}

                <p className={token ? 'status success' : 'status error'}>{authMessage}</p>
                
                {/* Botón para alternar Login/Register */}
                <p className="toggle-mode">
                    {isRegisterMode ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
                    <button 
                        type="button" 
                        className="link-button" 
                        onClick={() => setIsRegisterMode(!isRegisterMode)}
                    >
                        {isRegisterMode ? 'Inicia Sesión' : 'Regístrate aquí'}
                    </button>
                </p>
            </section>
        </div>
    );
}