// const sort = require("jest-sroted")
const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const endPointJson = require("../endpoints.json");
const articleData = require("../db/data/test-data/articles");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("api/topics", () => {
  test("returns an array ", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((body) => {
        const arrayOfTopics = body.body.topics;
        expect(Array.isArray(arrayOfTopics)).toBe(true);
      });
  });
  test("expect 200 status code , check if each obj in array has the keys slug and description  ", () => {
    return request(app)
      .get("/api/topics")

      .then((body) => {
        const arrayOfTopics = body.body.topics;

        const areKeysPresent = arrayOfTopics.every((obj) => {
          if (obj.slug !== null && obj.description !== null) {
            return true;
          } else {
            return false;
          }
        });
        expect(areKeysPresent).toBe(true);
      });
  });
});
describe("GET /api", () => {
  test("200,returns the endpoint ", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        expect(response.body.endPoints).toEqual(endPointJson);
      });
  });
});

describe("error handler", () => {
  test("returns 404 error if topics is not present after /api ", () => {
    return (
      request(app)
        .get("/api/topic")
        // wrong end point name
        .expect(404)
    );
  });
});

describe.only("GET /api/articles (task 5 )", () => {
  test("200, returns article and checks if all objects have the keys they need ", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        //      console.log(articleData,"this is the the required in file ")
        for (const obj of res.body.articles) {
          expect(obj).toHaveProperty("author");
          expect(obj).toHaveProperty("title");
          expect(obj).toHaveProperty("article_id");
          expect(obj).toHaveProperty("topic");
          expect(obj).toHaveProperty("created_at");
          expect(obj).toHaveProperty("votes");
          expect(obj).toHaveProperty("article_img_url");
        }
      });
  });
  test("200, check if all the articles are returned in descending order from the date value from the key created_at ", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        const arrayOfArticles = res.body.articles;
        expect(arrayOfArticles).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
  test.only("200, check if the every article does not contain the body key ", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        const arrayOfArticles = res.body.articles;
        for (const obj of arrayOfArticles) {
          expect(obj.hasOwnProperty("body")).toBe(false);
        }
      });
  });
});
