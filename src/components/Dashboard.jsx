import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/posts', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setPosts(response.data);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoadingPosts(false);
            }
        };
        fetchPosts();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-indigo-500 selection:text-white">
            {/* Navbar */}
            <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">
                                IF
                            </div>
                            <span className="text-xl font-extrabold tracking-tight text-gray-900">Iron Forge Gym</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <span className="text-sm font-medium text-gray-600 hidden sm:block">
                                Welcome back, <span className="text-indigo-600 font-semibold">{user?.name}</span>
                            </span>
                            <button 
                                onClick={handleLogout} 
                                className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors shadow-md active:scale-[0.98]"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative">
                <div className="absolute inset-0 bg-gray-900">
                    <img className="w-full h-[500px] object-cover opacity-60 mix-blend-overlay" src="/gym_hero.png" alt="Gym Interior" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                </div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[500px] flex flex-col justify-center">
                    <span className="text-indigo-400 font-semibold tracking-wider uppercase text-sm mb-2">Member Portal</span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
                        Push Your Limits.
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed mb-8">
                        Access your membership details, view upcoming classes, and track your fitness journey all from your personalized dashboard.
                    </p>
                    <div className="flex gap-4">
                        <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-[0.98]">
                            Book a Class
                        </button>
                        <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-lg font-bold hover:bg-white/20 transition-all active:scale-[0.98]">
                            View Schedule
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Membership Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100 h-full">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-2xl text-white font-bold shadow-inner overflow-hidden border-2 border-white ring-2 ring-indigo-50">
                                    {user?.photo ? (
                                        <img src={user.photo} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        user?.name?.charAt(0)?.toUpperCase() || 'U'
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                                    <p className="text-sm text-gray-500">Pro Membership</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Email Address</p>
                                    <p className="text-gray-900 font-semibold">{user?.email}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Member ID</p>
                                    <p className="text-gray-900 font-semibold tracking-widest">#{user?.id ? String(user.id).padStart(6, '0') : '000000'}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Status</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <p className="text-emerald-700 font-semibold">Active</p>
                                    </div>
                                </div>
                                {(user?.village || user?.district) && (
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Location</p>
                                        <p className="text-gray-900 font-semibold">
                                            {[user.village, user.district].filter(Boolean).join(', ')}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Profile Showcase */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden h-full flex flex-col">
                            {/* Banner */}
                            <div className="h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
                                <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
                                <div className="absolute -bottom-16 left-8">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white flex items-center justify-center text-5xl text-indigo-600 font-bold">
                                        {user?.photo ? (
                                            <img src={user.photo} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            user?.name?.charAt(0)?.toUpperCase() || 'U'
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Profile Details */}
                            <div className="pt-20 px-8 pb-8 flex-1">
                                <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
                                    <div>
                                        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{user?.name || 'Your Name'}</h2>
                                        <p className="text-indigo-600 font-medium">{user?.email || 'email@example.com'}</p>
                                    </div>
                                    <span className="bg-emerald-100 text-emerald-800 text-sm font-bold px-4 py-1.5 rounded-full border border-emerald-200 shadow-sm whitespace-nowrap">
                                        Active Member
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 border-t border-gray-100 pt-8">
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                            Village / City
                                        </h3>
                                        <p className="text-xl font-semibold text-gray-800">
                                            {user?.village || <span className="text-gray-400 italic font-normal text-base">Not Provided</span>}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            District
                                        </h3>
                                        <p className="text-xl font-semibold text-gray-800">
                                            {user?.district || <span className="text-gray-400 italic font-normal text-base">Not Provided</span>}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-12 bg-indigo-50 rounded-xl p-6 border border-indigo-100 flex items-center justify-between gap-4 shadow-inner">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-600">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <p className="text-indigo-900 text-sm leading-relaxed hidden sm:block">
                                            Share your fitness journey with the community!
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => navigate('/create-post')}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-md transition-colors whitespace-nowrap flex items-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                        Create Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Community Feed Section */}
                <div className="mt-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Community Feed</h2>
                        <span className="bg-gray-100 text-gray-600 text-sm font-semibold px-4 py-1.5 rounded-full border border-gray-200">
                            {posts.length} Updates
                        </span>
                    </div>

                    {loadingPosts ? (
                        <div className="flex justify-center items-center py-20">
                            <svg className="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No posts yet</h3>
                            <p className="text-gray-500 max-w-md mx-auto mb-6">Be the first to share an update with the Iron Forge Gym community!</p>
                            <button 
                                onClick={() => navigate('/create-post')}
                                className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline"
                            >
                                Write the first post &rarr;
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map(post => (
                                <div key={post.id} className="bg-white rounded-2xl shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300">
                                    <div className="p-6 flex items-center gap-4 border-b border-gray-50">
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-50 bg-gray-100 flex items-center justify-center text-indigo-600 font-bold flex-shrink-0">
                                            {post.authorPhoto ? (
                                                <img src={post.authorPhoto} alt={post.authorName} className="w-full h-full object-cover" />
                                            ) : (
                                                post.authorName?.charAt(0)?.toUpperCase() || 'U'
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 leading-tight">{post.authorName}</h3>
                                            <p className="text-xs text-gray-500 font-medium">
                                                {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} at {new Date(post.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6 flex-1">
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.description}</p>
                                    </div>

                                    {post.photo && (
                                        <div className="w-full h-64 bg-gray-50 border-t border-gray-100">
                                            <img src={post.photo} alt="Post attachment" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
