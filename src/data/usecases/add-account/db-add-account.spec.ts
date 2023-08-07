import { DbAddAccount } from "./db-add-account";
import {
  AccountModel,
  AddAccountModel,
  Hasher,
  AddAccountRepository,
  LoadAccountByEmailRepository
} from "./db-add-account-protocols";

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }

  return new HasherStub();
};

const makeAddAccountRepository = (): AddAccountRepository => {
  class addAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }

  return new addAccountRepositoryStub();
};

const makeFakeAccount = (): AccountModel => ({
  id: "valid_id",
  name: "valid_name",
  email: "valid_email@email.com",
  password: "hashed_password",
})

const makeFakeAccountData = (): AddAccountModel => ({
  name: "valid_name",
  email: "valid_email@email.com",
  password: "valid_password",
})

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
      async loadByEmail(email: string): Promise<AccountModel> {
          return new Promise(resolve => resolve(makeFakeAccount()))
      }
  }
  return new LoadAccountByEmailRepositoryStub()
}

interface SutTypes {
  sut: DbAddAccount;
  hasherStub: Hasher;
  addAccountRepositoryStub: AddAccountRepository;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hasherStub = makeHasher();
  const addAccountRepositoryStub = makeAddAccountRepository();
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

    await sut.add(makeFakeAccountData());
    expect(encryptSpy).toHaveBeenCalledWith("valid_password");
  });

  test("Shold throw if Hahser throws", async () => {
    const { sut, hasherStub } = makeSut();
    jest
      .spyOn(hasherStub, "hash")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const promise = sut.add(makeFakeAccountData());
    await expect(promise).rejects.toThrow();
  });

  test("Shold call AddAccountRepository with correct values", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, "add");

    await sut.add(makeFakeAccountData());
    expect(addSpy).toHaveBeenCalledWith({
      name: "valid_name",
      email: "valid_email@email.com",
      password: "hashed_password",
    });
  });

  test("Shold throw if AddAccountRepository throws", async () => {
    const { sut, addAccountRepositoryStub } =  makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementation(() => {
      throw new Error();
    })

    const promise = sut.add(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  });

  test("Shold return an account on success", async () => {
    const { sut } = makeSut();

    const account = await sut.add(makeFakeAccountData());
    expect(account).toEqual(makeFakeAccount())
  });

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(makeFakeAccountData())
    expect(loadSpy).toHaveBeenCalledWith('valid_email@email.com')
});
});
