const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

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

  test("returns 404 error if topics is not present after /api ", () => {
    return (
      request(app)
        .get("/api/topic")
        // wrong end point name
        .expect(404)
    );
  });
});

describe("GET /api/articles/:article_id", () => {
  test("returns article api ", () => {
    return request(app).get("/api/articles").expect(200);
  });
  test("200,check if it returns an array ", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        const arrayOfArticles = response.body.data;
        expect(Array.isArray(arrayOfArticles)).toBe(true);
      });
  });
  test("200,returns the correct obj ", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then((response) => {
        const arrayOfArticles = response.body.data;
        const articleId = arrayOfArticles[0].article_id;
        expect(articleId).toBe(2);
      });
  });

  test("400, article must be a number ", () => {
    return request(app).get("/api/articles/j").expect(400);
  });
  test("204, no content fouund  ", () => {
    return request(app).get("/api/articles/500").expect(204);
  });
});
