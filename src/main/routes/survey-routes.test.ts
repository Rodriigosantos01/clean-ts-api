import request from "supertest";
import app from "../config/app";
import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helpers";
import { Collection } from "mongodb";

let surveyCollection: Collection

jest.useRealTimers();

describe("Survey Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection("surveys");
    await surveyCollection.deleteMany({});
  });

  describe("POST /surveys ", () => {
    test("Should return 204 on add survey success", async () => {
      await request(app)
        .post("/api/surveys")
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'http://image-name.com'
            },
            {
              answer: 'Answer @',
            }
          ]
        })
        .expect(204);
    });
  });

  
});
