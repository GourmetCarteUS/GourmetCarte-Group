import { Authentication } from 'group-common';

class TokenStorageClass {
    private name = 'AUTH_TOKEN';

    getToken(): Authentication | null {
        const value = uni.getStorageSync(this.name);
        return value ? JSON.parse(value) : '';
    }

    setToken(value: Authentication) {
        uni.setStorageSync(this.name, JSON.stringify(value));
    }

    removeToken() {
        uni.removeStorageSync(this.name);
    }

    isTokenExpire(curTime: number) {
        const token = this.getToken();
        if (!token) return null;
        if (token.expires) return token.expires <= curTime;
    }
}

const useTokenStorage = new TokenStorageClass();

export default useTokenStorage;
