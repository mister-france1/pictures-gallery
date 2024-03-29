export interface TokenData {
    accessToken: {
        jwtToken: string;
        payload: {
            sub: string;
            iss: string;
            client_id: string;
            origin_jti: string;
            event_id: string;
            token_use: string;
            scope: string;
            auth_time: number;
            exp: number;
            iat: number;
            jti: string;
            username: string;
        }
    }
    clockDrift: number;
    idToken: {
        jwtToken: string;
        payload: {
            sub: string;
            email_verified: boolean;
            iss: string;
            "cognito:username": string;
            origin_jti: string;
            aud: string;
            event_id: string;
            token_use: string;
            auth_time: number;
            exp: number;
            iat: number;
            jti: string;
            email: string;
        };
    };
    refreshToken: {
        token: string;
        expiresIn: number;
    };
}
