import { mockHasher, mockAddAccountRepository, mockLoadAccountByEmailRepository } from "@/data/test";
import { DbAddAccount } from "./db-add-account";
import { Hasher, AddAccountRepository, LoadAccountByEmailRepository } from "./db-add-account-protocols";
import { mockAccountModel, mockAccountParams, throwError } from "@/domain/test"

type SutTypes = {
  sut: DbAddAccount;
  hasherStub: Hasher;
  addAccountRepositoryStub: AddAccountRepository;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const hasherStub = mockHasher();
  const addAccountRepositoryStub = mockAddAccountRepository();
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub);
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  };
};

describe("DbAddAccount Usecase", () => {
  test("Shold call Hahser with correct password", async () => {
    const { sut, hasherStub } = makeSut();
    const encryptSpy = jest.spyOn(hasherStub, "hash");

    await sut.add(mockAccountParams());
    expect(encryptSpy).toHaveBeenCalledWith("any_password");
  });

  test("Shold throw if Hahser throws", async () => {
    const { sut, hasherStub } = makeSut();
    jest
      .spyOn(hasherStub, "hash")
      .mockImplementationOnce(throwError);

    const promise = sut.add(mockAccountParams());
    await expect(promise).rejects.toThrow();
  });

  test("Shold call AddAccountRepository with correct values", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, "add");

    await sut.add(mockAccountParams());
    expect(addSpy).toHaveBeenCalledWith({
      name: "any_name",
      email: "any_email@email.com",
      password: "hashed_password",
    });
  });

  test("Shold throw if AddAccountRepository throws", async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementation(throwError)

    const promise = sut.add(mockAccountParams())
    await expect(promise).rejects.toThrow()
  });

  test("Shold return an account on success", async () => {
    const { sut } = makeSut();
    const account = await sut.add(mockAccountParams());
    expect(account).toEqual(mockAccountModel())
  });

  test("Shold return null if LoadAccountByEmailRepository not returns null", async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise(resolve => resolve(mockAccountModel())))
    const account = await sut.add(mockAccountParams());
    expect(account).toBeNull()
  });

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(mockAccountParams())
    expect(loadSpy).toHaveBeenCalledWith('any_email@email.com')
  });
});
