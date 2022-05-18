import * as bcrypt from 'bcrypt';

export const encryptPassword = async (plainPassword: string) => {
    const saltOrRounds = 10;
    return await bcrypt.hash(plainPassword, saltOrRounds);
};

export const matchPassword = async (
    plainPassword: string,
    encryptedPassword: string,
) => {
    return await bcrypt.compare(plainPassword, encryptedPassword);
};
