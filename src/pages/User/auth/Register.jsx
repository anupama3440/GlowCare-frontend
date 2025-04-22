import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { registeration } from '../../../services/authService';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false)

    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };

    const validatephone = (number) => {
        const mobilePattern = /^[0-9]{10}$/;
        return mobilePattern.test(number);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;

        if (!username) {
            setUsernameError('Username is required.');
            valid = false;
        } else {
            setUsernameError('');
        }

        if (!email || !validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!phone || !validatephone(phone)) {
            setPhoneError('Please enter a valid mobile number.');
            valid = false;
        } else {
            setPhoneError('');
        }

        if (!password || password.length < 6) {
            setPasswordError('Password must be at least 6 characters long.');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
            valid = false;
        } else {
            setConfirmPasswordError('');
        }

        if (valid) {
            setLoading(true);
            try {
                const data = {
                    name: username,
                    phone,
                    email,
                    password
                }

                const result = await registeration(data);
                if (result) {
                    toast.success(result.message);
                    navigate('/otp', { state: result.email });
                }

            } catch (error) {
                setLoading(false)
                console.log('error in registering', error)
                toast.error('Internal Server Error, Try after sometime')
            }
        }
    };


    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="flex flex-col md:flex-row w-full h-screen">
            <div className='flex items-center justify-center bg-gradient-to-br from-yellow-300 to-yellow-100 w-full md:w-1/2'>
                <DotLottieReact
                    src="https://lottie.host/ed6081e4-8829-42bc-9a47-18fba520254d/eRVUAdH3r9.lottie"
                    loop
                    autoplay
                    style={{ width: 'auto', height: '70%' }}
                />
            </div>
            <div className="flex items-center justify-center w-full md:w-1/2 p-6">
                <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

                    {/* Username Input */}
                    <div className="flex flex-col w-full gap-1 mb-2">
                        <label className="text-sm font-medium">Username:</label>
                        <input
                            className={`border ${usernameError ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:outline-none focus:ring-2 ${usernameError ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col w-full gap-1 mb-2">
                        <label className="text-sm font-medium">Email Address:</label>
                        <input
                            className={`border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:outline-none focus:ring-2 ${emailError ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                            type="text"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                    </div>

                    {/* Mobile Number Input */}
                    <div className="flex flex-col w-full gap-1 mb-2">
                        <label className="text-sm font-medium">Mobile Number:</label>
                        <input
                            className={`border ${phoneError ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:outline-none focus:ring-2 ${phoneError ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                            type="text"
                            placeholder="Enter your mobile number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
                    </div>

                    {/* Password Input with Show/Hide Button */}
                    <div className="flex flex-col w-full gap-1 mb-6 relative">
                        <label className="text-sm font-medium">Password:</label>
                        <input
                            className={`border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 ${passwordError ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                            type='password'
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                    </div>

                    {/* Confirm Password Input */}
                    <div className="flex flex-col w-full gap-1 mb-2">
                        <label className="text-sm font-medium">Confirm Password:</label>
                        <input
                            className={`border ${confirmPasswordError ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 focus:outline-none focus:ring-2 ${confirmPasswordError ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                            type='password'
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>}
                    </div>

                    {/* Register Button */}
                    <button
                        className={`w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-bold rounded-lg p-3 transition duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Registering.....' : 'Register'}
                    </button>


                    {/* Login Link */}
                    <div className="mt-4 text-center">
                        <p>Already have an account?{' '}
                            <span
                                className="text-blue-600 cursor-pointer hover:underline"
                                onClick={handleLogin}
                            >
                                Login
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;