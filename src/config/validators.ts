export class Validators {

  static isEmail = (email: string): boolean => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
  }

  static isMondoDBId = (id: string): boolean => {
    return /^[0-9a-fA-F]{24}$/.test(id);
  }
}