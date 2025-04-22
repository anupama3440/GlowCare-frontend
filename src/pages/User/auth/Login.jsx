import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgCloseR } from "react-icons/cg";
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { login } from '../../../services/authService';
import { userLogin } from '../../../redux/slice/userAuthSlice';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [openForgotPassword, setOpenForgotPassword] = useState(false);
    const [forgotEmailError, setForgotEmailError] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingForgot, setLoadingForgot] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                const result = await login({ email, password })
                console.log(result, '----------from in the login page');
                if (result.success) {
                    toast.success(result.message);
                    Cookies.set('userAccessToken', result.tokens.accessToken)
                    Cookies.set('userRefreshToken', result.tokens.refreshToken);
                    dispatch(userLogin(result.user));
                    navigate('/')
                }
            } catch (error) {
                setLoading(false)
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignUp = () => {
        navigate('/register');
    };

    const handleForgotPassword = async () => {
        setLoadingForgot(true)
        if (!email || !validateEmail(email)) {
            setLoadingForgot(false)
            setForgotEmailError('Please enter a valid email address.');
        } else {
            try {
                setLoadingForgot(true);
                setTimeout(() => {
                    setLoadingForgot(false)
                }, 2000)
            } catch (error) {
                console.log('Error while forgetPassword');
                setLoadingForgot(false)
                toast.error('Something went wrong, Please try again');
            }
        }
    };

    return (
        <div className='flex flex-col md:flex-row w-full h-screen'>
            <div className='flex items-center justify-center bg-gradient-to-br from-yellow-300 to-yellow-100 w-full md:w-1/2'>
                <DotLottieReact
                    src="https://lottie.host/ed6081e4-8829-42bc-9a47-18fba520254d/eRVUAdH3r9.lottie"
                    loop
                    autoplay
                    style={{ width: 'auto', height: '70%' }}
                />
            </div>

            <div className='flex items-center justify-center w-full md:w-1/2 p-6'>
                <form onSubmit={handleSubmit} className='w-full max-w-md bg-white rounded-lg shadow-lg p-8'>
                    <h2 className='text-2xl font-bold text-center mb-6'>Login</h2>

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

                    <div className='flex mb-4 justify-end'>
                        <span
                            className='cursor-pointer hover:underline hover:text-blue-600'
                            onClick={() => setOpenForgotPassword(true)}
                        >
                            Forgot Password ?
                        </span>
                    </div>

                    {/* Login Button */}
                    <button
                        className={`w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-bold rounded-lg p-3 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? 'Login....' : 'Login'}
                    </button>

                    {/* Sign Up Link */}
                    <div className='mt-4 text-center'>
                        <p>Not a member yet?{' '}
                            <span
                                className='text-blue-600 cursor-pointer hover:underline'
                                onClick={handleSignUp}
                            >
                                Sign up!
                            </span>
                        </p>
                    </div>
                </form>
            </div>

            {
                openForgotPassword &&
                <div className="fixed inset-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-lg p-8 relative">
                        <button
                            onClick={() => setOpenForgotPassword(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition duration-200"
                        >
                            <CgCloseR size={30} />
                        </button>

                        <div className="flex flex-col w-full gap-6 items-center">
                            <h2 className="text-3xl font-bold text-center text-gray-800">Reset Password</h2>

                            {/* Email Input Section */}
                            <div className="w-full">
                                <label className="block text-lg font-medium text-gray-700">Email Address:</label>
                                <input
                                    className={`mt-1 block w-full p-3 border ${forgotEmailError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 ${forgotEmailError ? 'focus:ring-red-500' : 'focus:ring-blue-500'} transition duration-200`}
                                    type="text"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {forgotEmailError && <p className="text-red-500 text-sm mt-2">{forgotEmailError}</p>}
                            </div>

                            {/* Reset Button */}
                            <button
                                className={`w-full bg-gradient-to-r from-yellow-200 to-yellow-300 text-black font-bold rounded-lg p-3 mt-4 hover:bg-gradient-to-r transition duration-300 ease-in-out transform hover:scale-105 shadow-lg ${loadingForgot && 'opacity-50 cursor-not-allowed'}`}
                                type="button"
                                onClick={handleForgotPassword}
                                disabled={loadingForgot}
                            >
                                Reset Password
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Login;