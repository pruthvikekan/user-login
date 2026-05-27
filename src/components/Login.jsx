import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-slate-950 overflow-hidden font-sans">
            {/* Background decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
            <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-pink-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob" style={{ animationDelay: '4s' }}></div>

            <div className="relative z-10 w-full max-w-md p-8 sm:p-10 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl">
                <div className="mb-8 text-center">
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">Welcome Back</h2>
                    <p className="text-gray-300 text-sm tracking-wide">Enter your credentials to access your account</p>
                </div>
                
                {error && <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-xl mb-6 text-sm text-center backdrop-blur-sm shadow-inner">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2 pl-1">Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300" 
                            placeholder="you@example.com" />
                    </div>
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2 pl-1">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300" 
                            placeholder="••••••••" />
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3.5 rounded-xl hover:from-purple-500 hover:to-pink-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transform hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0">
                        Sign In
                    </button>
                </form>
                <p className="mt-8 text-center text-sm text-gray-400">
                    Don't have an account? <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200 hover:underline">Create one</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
