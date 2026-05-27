import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axiosConfig';

const CreatePost = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!description.trim()) {
            setError('Please add a description for your post.');
            return;
        }

        setLoading(true);
        try {
            await api.post('/posts', { description, photo }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create post. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-6 px-8 text-white relative">
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="absolute top-6 left-6 text-white/80 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <h2 className="text-2xl font-bold text-center">Create New Post</h2>
                </div>
                
                <div className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-100 bg-gray-100 flex items-center justify-center text-indigo-600 font-bold">
                            {user?.photo ? (
                                <img src={user.photo} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                user?.name?.charAt(0)?.toUpperCase() || 'U'
                            )}
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">{user?.name}</p>
                            <p className="text-xs text-gray-500">Posting to community feed</p>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-lg text-sm border border-red-100 flex items-center gap-2">
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="What's on your mind? Share your workout..."
                                rows="4"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Attach Photo</label>
                            
                            {photo ? (
                                <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50 inline-block">
                                    <img src={photo} alt="Post preview" className="max-h-64 object-contain" />
                                    <button
                                        type="button"
                                        onClick={() => setPhoto('')}
                                        className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors cursor-pointer relative">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="flex text-sm text-gray-600 justify-center">
                                            <span className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                <span>Upload a file</span>
                                                <input type="file" accept="image/*" className="sr-only" onChange={handlePhotoChange} />
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                                    </div>
                                    <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handlePhotoChange} />
                                </div>
                            )}
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Posting...
                                    </>
                                ) : (
                                    'Share Post'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
