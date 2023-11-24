const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
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

  test("returns 404 error if topics is not present after /api ", () => {
    return (
      request(app)
        .get("/api/topic")
        // wrong end point name
        .expect(404)
    );
  });
});

describe("GET /api/articles", () => {
  test("returns article api ", () => {
    return request(app).get("/api/articles").expect(200);
  });
  test("200,check if it returns the right keys ", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const arrayOfArticles = response.body.data;

        expect(arrayOfArticles[0]).toHaveProperty("title");
        expect(arrayOfArticles[0]).toHaveProperty("topic");
        expect(arrayOfArticles[0]).toHaveProperty("author");
        expect(arrayOfArticles[0]).toHaveProperty("body");
      });
  });
  test("200,returns the correct obj ", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then((response) => {
        const articleObj = response.body.data;
        const articleId = articleObj.article_id;
        expect(articleId).toBe(2);
        expect(articleObj.title).toBe(articleData[1].title);
        expect(articleObj.topic).toBe(articleData[1].topic);
        expect(articleObj.author).toBe(articleData[1].author);
        expect(articleObj.body).toBe(articleData[1].body);
        //        expect(arrayOfArticles[0]).toBe(articleData[2])
      });
  });

  test("404, no column found with htis specific name  ", () => {
    return request(app)
      .get("/api/articles/900")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Not Found");
      });
  });
  test("400, no column found with htis specific name  ", () => {
    return request(app)
      .get("/api/articles/jl")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
});
