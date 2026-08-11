import api from './api';

export const loginWithPhone = async (phone) => {
  try {
    const res = await api.post('/auth/send-otp', { phone });
    return res.data;
  } catch (err) {
    console.error("Auth Error:", err);
    throw err;
  }
};

export const verifyOtp = async (phone, otp) => {
  try {
    const res = await api.post('/auth/verify-otp', { phone, otp });
    if (res.data.token) {
      localStorage.setItem('pw_token', res.data.token);
      localStorage.setItem('pw_user', JSON.stringify(res.data.user));
    }
    return res.data;
  } catch (err) {
    console.error("OTP Verification Error:", err);
    throw err;
  }
};

export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('pw_user');
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem('pw_token');
  localStorage.removeItem('pw_user');
};
