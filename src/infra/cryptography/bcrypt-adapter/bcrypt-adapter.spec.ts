import { throwError } from "@/domain/test";
import { BcryptAdapter } from "./bcrypt-adapter";
import bcrypt from "bcrypt";

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return Promise.resolve("hash")
  },
  async compare(): Promise<boolean> {
    return Promise.resolve(true)
  },
}));

const salt = 12;

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe("Bcrypt Adapter", () => {
  describe('hash()', () => {
    test("Should call hash with correc values", async () => {
      const sut = makeSut();
      const hashSpy = jest.spyOn(bcrypt, "hash");
      sut.hash("any_value");
      expect(hashSpy).toHaveBeenCalledWith("any_value", salt);
    });

    test("Should return a valid hash on hash success", async () => {
      const sut = makeSut();

      const hash = await sut.hash("any_value");
      expect(hash).toBe("hash");
    });

    test("Should throw if hash throws", async () => {
      const sut = makeSut();

      jest.spyOn(bcrypt, "hash").mockImplementation(throwError)

      const promise = sut.hash("any_value");
      await expect(promise).rejects.toThrow();
    });
  });


  describe('compare()', () => {
    test("Should call compare with correc values", async () => {
      const sut = makeSut();
      const compareSpy = jest.spyOn(bcrypt, "compare");
      sut.compare("any_value", 'any_hash');
      expect(compareSpy).toHaveBeenCalledWith("any_value", 'any_hash');
    });

    test("Should return true when compare succeeds", async () => {
      const sut = makeSut();

      const isValid = await sut.compare("any_value", 'any_hash');
      expect(isValid).toBe(true);
    });

    test("Should return false when compare fails", async () => {
      const sut = makeSut();
      jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => Promise.resolve(false))
      const isValid = await sut.compare("any_value", 'any_hash');
      expect(isValid).toBe(false);
    });

    test("Should throw if compare throws", async () => {
      const sut = makeSut();

      jest.spyOn(bcrypt, "compare").mockImplementation(throwError)

      const promise = sut.compare("any_value", 'any_hash');
      await expect(promise).rejects.toThrow();
    });

  });
});
