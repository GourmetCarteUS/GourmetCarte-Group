export interface Token {
    token: string;
    expires: number;
}

class TokenStorageClass {
    private name = 'AUTH_TOKEN';

    getToken(): Token | null {
        const value = uni.getStorageSync(this.name);
        return value ? JSON.parse(value) : '';
    }

    setToken(value: Token) {
        uni.setStorageSync(this.name, JSON.stringify(value));
    }

    removeToken() {
        uni.removeStorageSync(this.name);
    }

    isTokenExpire(curTime: number) {
        const token = this.getToken();
        if (!token) return null;
        return token.expires <= curTime;
    }
}

const useTokenStorage = new TokenStorageClass();

export default useTokenStorage;
