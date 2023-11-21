const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  db.end();
});

describe("api/topics", () => {
  test("recieve status code 200", () => {
    return request(app).get("/api/topics").expect(200);
  });
  test("returns an array ", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((body) => {
        const arrayOfTopics = body._body;
        expect(Array.isArray(arrayOfTopics)).toBe(true);
      });
  });
  test("check if each obj in array has the keys slug and description  ", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((body) => {
        const arrayOfTopics = body._body;
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
