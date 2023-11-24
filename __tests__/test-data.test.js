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

describe("GET /api/articles (task 5 )", () => {
  test("200, returns article and checks if all objects have the keys they need ", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        expect(res.body.articles.length).not.toBe(0);
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
  test("200, check if the every article does not contain the body key ", () => {
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
  test("404, no column found with htis specific name  ", () => {
    return request(app)
      .get("/api/art")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not Found");
      });
  });
  describe("GET /api/articles", () => {
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
          expect(articleObj.articles).toBe(articleData[1].articles);
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
    test("400, no article exists in the data base   ", () => {
      return request(app)
        .get("/api/articles/twelve")
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Bad Request");
        });
    });
  });
});
