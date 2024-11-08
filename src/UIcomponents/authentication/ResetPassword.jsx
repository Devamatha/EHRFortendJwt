import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({ newPassword: '', confirmPassword: '' });
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleNewPasswordVisibility = () => {
        setNewPasswordVisible(!newPasswordVisible);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
        // Clear error message when user starts typing
        if (errors.newPassword) {
            setErrors({ ...errors, newPassword: '' });
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        // Clear error message when user starts typing
        if (errors.confirmPassword) {
            setErrors({ ...errors, confirmPassword: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = { newPassword: '', confirmPassword: '' };

        // Validate new password length
        if (!newPassword) {
            newErrors.newPassword = 'Please enter a new password';
        } else if (newPassword.length < 5) {
            newErrors.newPassword = 'Password must be at least 5 characters long';
        }

        // Validate confirm password length
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (confirmPassword.length < 5) {
            newErrors.confirmPassword = 'Password must be at least 5 characters long';
        }

        // Validate if passwords match
        if (newPassword && confirmPassword && newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Set errors if any
        setErrors(newErrors);

        // If no errors, proceed with password reset logic
        if (!newErrors.newPassword && !newErrors.confirmPassword) {
            // Perform password reset logic here
            // console.log('Password reset successful');
            navigate('/login');

        }
    };

    return (
        <div className='login-bg h-screen flex justify-center items-center totalPage'>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <h1 className='text-white md:text-[48px] text-[28px] text-center font-bold leading-[56px]'>Reset Password</h1>
                </div>
                <div className="auth-card py-[36px] md:px-[36px] px-[30px] md:w-[686px] w-full bg-[#fcfcf4] rounded-[6px]">
                    <div className="mb-4 md:h-[100px] h-[80px]">
                        <label className="block text-white font-medium mb-1 md:text-[24px] text-[16px]">Enter New Password</label>
                        <div className="relative">
                            <input
                                type={newPasswordVisible ? "text" : "password"}
                                className="w-full px-4 py-2 rounded-lg bg-white outline-none"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                            />
                            <div className="absolute inset-y-0 right-0 pr-5 flex items-center cursor-pointer" onClick={toggleNewPasswordVisibility}>
                                {newPasswordVisible ? <FaEyeSlash className="w-[24px] h-[24px]" /> : <FaEye className="w-[24px] h-[24px]" />}
                            </div>
                        </div>
                        {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
                    </div>
                    <div className="mb-2 md:h-[100px] h-[80px]">
                        <label className="block text-white font-medium mb-1 md:text-[24px] text-[16px]">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                className="w-full px-4 py-2 rounded-lg bg-white outline-none"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                            <div className="absolute inset-y-0 right-0 pr-5 flex items-center cursor-pointer" onClick={togglePasswordVisibility}>
                                {passwordVisible ? <FaEyeSlash className="w-[24px] h-[24px]" /> : <FaEye className="w-[24px] h-[24px]" />}
                            </div>
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>

                    <div className="flex justify-center items-center mt-8">
                        <button
                            type="submit"
                            className="w-full bg-[#000000] text-[24px] text-white h-[50px] rounded-[5px] hover:bg-[#c445fe] transition-colors"
                        >
                            Reset
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
}

export default ResetPassword;