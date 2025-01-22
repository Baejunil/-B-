import React, { useState } from 'react';
import axios from 'axios';

const ResetPasswordForm = () => {
    const [form, setForm] = useState({ userId: '', email: '', newPassword: '' });
    const [step, setStep] = useState(1); // Step 1: 이메일 인증, Step 2: 비밀번호 재설정

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFindPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/users/find-password', {
                userId: form.userId,
                email: form.email,
            });
            alert('인증 성공! 비밀번호를 재설정하세요.');
            setStep(2); // 비밀번호 재설정 단계로 이동
        } catch (error) {
            alert('비밀번호 찾기 실패: ' + error.response.data.error);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/users/reset-password', {
                userId: form.userId,
                newPassword: form.newPassword,
            });
            alert('비밀번호가 성공적으로 재설정되었습니다!');
        } catch (error) {
            alert('비밀번호 재설정 실패: ' + error.response.data.error);
        }
    };

    return (
        <form onSubmit={step === 1 ? handleFindPassword : handleResetPassword}>
            <div>
                <label>아이디:</label>
                <input
                    type="text"
                    name="userId"
                    value={form.userId}
                    onChange={handleChange}
                    placeholder="아이디를 입력하세요"
                />
            </div>
            <div>
                <label>이메일:</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="이메일을 입력하세요"
                />
            </div>
            {step === 2 && (
                <div>
                    <label>새 비밀번호:</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={form.newPassword}
                        onChange={handleChange}
                        placeholder="새 비밀번호를 입력하세요"
                    />
                </div>
            )}
            <button type="submit">{step === 1 ? '비밀번호 찾기' : '비밀번호 재설정'}</button>
        </form>
    );
};

export default ResetPasswordForm;
