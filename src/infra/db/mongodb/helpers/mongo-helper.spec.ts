import { MongoHelper as sut } from "./mongo-helpers";
describe("Mongo Helper", () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await sut.disconnect();
  });

  test("Should reconnect if mongodb is down", async () => {
    let accountCollection = await sut.getCollection("accounts");
    expect(accountCollection).toBeTruthy();
    accountCollection = await sut.getCollection("accounts");
    expect(accountCollection).toBeTruthy();
  });
});
