export interface Registration {
    username: string;
    email: string;
    password: string;
};

export interface ErrorRegistration {
    username?: string;
    email?: string;
    password?: string;
};
