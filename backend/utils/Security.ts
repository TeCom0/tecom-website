import argon2 from 'argon2'
export const hashPassword = async (password: string) => {
    try {
        return await argon2.hash(password);
    } catch (error) {
        throw error
    }
}

export const comparePassword = async (password: string, hashedPassword: string) => {
    try {
        return await argon2.verify(hashedPassword, password);
    } catch (error) {
        throw error
    }
};