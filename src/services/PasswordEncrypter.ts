import bcrypt from "bcrypt";

class PasswordEncrypter {
    static async encrypt(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    static async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}

export default PasswordEncrypter;
