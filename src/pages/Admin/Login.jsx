import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { adminLogin } from '../../services/adminService';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;

        if (!email || !validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!password || password.length < 6) {
            setPasswordError('Password must be at least 6 characters long.');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (valid) {
            try {
                setLoading(true)
                const response = await adminLogin({ email, password });
                console.log(response);
                if (response.success) {
                    toast.success(response.message);
                    localStorage.setItem('adminAccessToken', response.tokens.accessToken);
                    localStorage.setItem('adminRefreshToken', response.tokens.refreshToken);
                    navigate('/admin/dashboard');
                    setLoading(false)
                } else {
                    toast.error(response.message);
                    setLoading(false)
                }
            } catch (error) {
                setLoading(false)
                toast.error('Something went wrong.')
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='flex flex-col md:flex-row w-full h-screen'>
            <div className='flex items-center justify-center bg-gradient-to-br from-blue-500 to-gray-100 w-full md:w-1/2'>
                <DotLottieReact
                    src="https://lottie.host/e2439a13-4ef4-4194-9988-151359238e24/qFlsJsaMdO.lottie"
                    loop
                    autoplay
                    style={{ width: 'auto', height: '70%' }}
                />
            </div>

            <div className='flex items-center justify-center w-full md:w-1/2 p-6'>
                <form onSubmit={handleSubmit} className='w-full max-w-md bg-white rounded-lg shadow-lg p-8'>
                    <h2 className='text-2xl font-bold text-center mb-6'>Admin Login</h2>

                    {/* Email Input */}
                    <div className='flex flex-col w-full gap-2 mb-4'>
                        <label className='text-lg font-medium'>Email Address:</label>
                        <input
                            className={`border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:outline-none focus:ring-2 ${emailError ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                            type="text"
                            placeholder='Enter your email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <p className='text-red-500 text-sm'>{emailError}</p>}
                    </div>

                    {/* Password Input with Show/Hide Button */}
                    <div className='flex flex-col w-full gap-2 mb-1 relative'>
                        <label className='text-lg font-medium'>Password:</label>
                        <input
                            className={`border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 ${passwordError ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <p className='text-red-500 text-sm'>{passwordError}</p>}

                        <button
                            type='button'
                            className='absolute top-12 right-4 text-gray-600 focus:outline-none'
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <span className='text-lg pt-6'>🐵</span> : <span className='text-lg pt-6'>🙈</span>}
                        </button>
                    </div>

                    {/* Login Button */}
                    <button
                        className={`w-full bg-gradient-to-r mt-5 from-green-400 to-green-600 text-white font-bold rounded-lg p-3 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? 'Login....' : 'Login'}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default Login;