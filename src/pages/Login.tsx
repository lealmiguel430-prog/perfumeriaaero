import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect path from query params or default to home
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('redirect') || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      login({
        id: '1',
        email: email,
        name: email.split('@')[0],
      });
      setIsLoading(false);
      navigate(redirectPath);
    }, 1500);
  };

  return (
    <main className="flex-grow flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md bg-[#1A2220] border border-gold/10 p-8 md:p-10 shadow-2xl relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-light via-gold to-gold-dark"></div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-cream mb-2">Bienvenido</h1>
          <p className="text-gray-400 text-sm">Ingresa a tu cuenta para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs uppercase tracking-widest text-gold/80 font-bold block">
              Correo Electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Mail size={18} />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/20 border border-gold/20 text-cream text-sm rounded-sm py-3 pl-10 pr-4 focus:outline-none focus:border-gold transition-colors placeholder-gray-600"
                placeholder="ejemplo@correo.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-xs uppercase tracking-widest text-gold/80 font-bold block">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Lock size={18} />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/20 border border-gold/20 text-cream text-sm rounded-sm py-3 pl-10 pr-4 focus:outline-none focus:border-gold transition-colors placeholder-gray-600"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center text-gray-400 hover:text-gold cursor-pointer">
              <input type="checkbox" className="mr-2 rounded border-gray-600 bg-transparent text-gold focus:ring-0" />
              Recordarme
            </label>
            <Link to="/forgot-password" className="text-gold hover:text-gold-light underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gold hover:bg-gold-light text-black font-bold py-3 uppercase tracking-widest text-sm transition-all hover:shadow-lg hover:shadow-gold/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gold/10 text-center">
          <p className="text-gray-400 text-sm">
            ¿No tienes una cuenta?{' '}
            <Link to={`/register?redirect=${redirectPath}`} className="text-gold font-bold hover:text-gold-light hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
