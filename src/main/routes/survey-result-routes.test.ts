import env from '@/main/config/env'
import app from "@/main/config/app";
import { MongoHelper } from "@/infra/db/mongodb/helpers/mongo-helpers";
import request from "supertest";
import { Collection } from "mongodb";
import { sign } from 'jsonwebtoken'
import { ObjectId } from 'mongodb'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Rodrigo',
    email: 'rodrigo@gmail.com',
    password: '123'
  });

  const id = res.insertedId;
  const accessToken = sign({ id: `${id}` }, env.jwtSecret)

  await accountCollection.updateOne({
    _id: id
  },
    {
      $set: { accessToken }
    })

  return accessToken
}

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

    accountCollection = await MongoHelper.getCollection("accounts");
    await accountCollection.deleteMany({});
  });

  describe("PUT /surveys/:surveyId/results ", () => {
    test("Should return 403 on save survey result without accessToken", async () => {
      await request(app)
        .put("/api/surveys/any_id/results")
        .send({
          answers: 'any_answer'
        })
        .expect(403);
    });

    // test("Should return 200 on save survey result with accessToken", async () => {
    //   const accessToken = await makeAccessToken()

    //   const res = await surveyCollection.insertOne({
    //     question: 'Question',
    //     answers: [{
    //       answer: 'Answer 1',
    //       image: 'http://image-name.com'
    //     },
    //     {
    //       answer: 'Answer 2'
    //     }],
    //     date: new Date()
    //   })

    //   await request(app)
    //     .put(`/api/surveys/${new ObjectId(res.insertedId)}/results`)
    //     .set('x-access-token', accessToken)
    //     .send({
    //       answers: 'Answer 1'
    //     })
    //     .expect(200);
    // });
  });
  describe("GET /surveys/:surveyId/results ", () => {
    test("Should return 403 on load survey result without accessToken", async () => {
      await request(app)
        .get("/api/surveys/any_id/results")
        .expect(403);
    });
  });
  describe("GET /surveys/:surveyId/results ", () => {
    test("Should return 200 on load survey result without accessToken", async () => {
      const accessToken = await makeAccessToken()

      const res = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        },
        {
          answer: 'Answer 2'
        }],
        date: new Date()
      })

      await request(app)
        .get(`/api/surveys/${res.insertedId}/results`)
        .set('x-access-token', accessToken)
        .expect(200);
    });
  });
});
