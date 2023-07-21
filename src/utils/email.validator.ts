import { EmailValidator } from "../representation/protocols/email-validator";


export class EmailValidatorAdapter implements EmailValidator{
    isValid(email: string): boolean {
        return false
    }
}