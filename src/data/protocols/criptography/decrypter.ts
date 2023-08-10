export interface Decrypter {
    dencrypt(value: string): Promise<string>
}