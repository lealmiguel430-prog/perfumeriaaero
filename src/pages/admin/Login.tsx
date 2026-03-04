import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Lock, User } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded admin credentials for demonstration purposes
    // In a real app, this would hit the backend API
    if (email === 'admin@aero.com' && password === 'admin123') {
      login({
        id: '1',
        email: email,
        name: 'Administrador',
        role: 'admin'
      });
      navigate('/admin/dashboard');
    } else {
      setError('Credenciales inválidas. Acceso denegado.');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#121212] border border-gold/20 p-8 rounded-lg shadow-[0_0_50px_rgba(212,175,55,0.1)]">
        <div className="text-center mb-8">
          <img src="./logo.png" alt="Aero Admin" className="h-24 mx-auto mb-4 object-contain" />
          <h2 className="text-2xl font-serif text-gold">Panel Administrativo</h2>
          <p className="text-gray-400 text-sm mt-2">Acceso restringido solo para personal autorizado</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2">Usuario</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-white/10 text-white pl-10 pr-4 py-3 rounded focus:border-gold/50 focus:outline-none transition-colors"
                placeholder="admin@aero.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 text-white pl-10 pr-4 py-3 rounded focus:border-gold/50 focus:outline-none transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gold text-black font-bold uppercase tracking-widest py-3 rounded hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
          >
            Ingresar al Panel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;