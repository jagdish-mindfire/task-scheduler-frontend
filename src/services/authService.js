import { authApi } from "../api/apiLogin";

const api = new authApi();

export const UserSignup = async (user) => {
    const data = {
        email: user.email, 
        name: user.name,
        password: user.password
    };

    const response = await api.signup(data);
    return response?.data; 
};

export const UserLogin = async (user) => {
    const data = {
        email: user.email, 
        password: user.password
    };

    const response = await api.login(data);

    return response?.data;
};

export const UserLogout = async () => {
    await api.logout();
    
};


