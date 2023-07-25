import { DbAddAccount } from "./db-add-account";
import {
  AccountModel,
  AddAccountModel,
  Encrypter,
  AddAccountRepository,
} from "./db-add-account-protocols";

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }

  return new EncrypterStub();
};

const makeAddAccountRepository = (): AddAccountRepository => {
  class addAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      return new Promise((resolve) => resolve(makeFaceAccount()));
    }
  }

  return new addAccountRepositoryStub();
};

const makeFaceAccount = (): AccountModel => ({
  id: "valid_id",
  name: "valid_name",
  email: "valid_email",
  password: "hashed_password",
})

const makeFaceAccountData = (): AddAccountModel => ({
  name: "valid_name",
  email: "valid_email",
  password: "valid_password",
})

interface SutTypes {
  sut: DbAddAccount;
  encrypterStub: Encrypter;
  addAccountRepositoryStub: AddAccountRepository;
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const addAccountRepositoryStub = makeAddAccountRepository();
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);
  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub,
  };
};

describe("DbAddAccount Usecase", () => {
  test("Shold call Encrypter with correct password", async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, "encrypt");

    await sut.add(makeFaceAccountData());
    expect(encryptSpy).toHaveBeenCalledWith("valid_password");
  });

  test("Shold throw if Encrypter throws", async () => {
    const { sut, encrypterStub } = makeSut();
    jest
      .spyOn(encrypterStub, "encrypt")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.add(makeFaceAccountData());
    await expect(promise).rejects.toThrow();
  });

  test("Shold call AddAccountRepository with correct values", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, "add");

    await sut.add(makeFaceAccountData());
    expect(addSpy).toHaveBeenCalledWith({
      name: "valid_name",
      email: "valid_email",
      password: "hashed_password",
    });
  });

  test("Shold throw if AddAccountRepository throws", async () => {
    const { sut, addAccountRepositoryStub } =  makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementation(() => {
      throw new Error();
    })

    const promise = sut.add(makeFaceAccountData())
    await expect(promise).rejects.toThrow()
  });

  test("Shold return an account on success", async () => {
    const { sut } = makeSut();

    const account = await sut.add(makeFaceAccountData());
    expect(account).toEqual(makeFaceAccount())
  });
});
