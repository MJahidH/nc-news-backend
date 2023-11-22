const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const endPointJson = require("../endpoints.json");

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

describe("get /api", () => {
  test("200,returns an object ", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        const endPointData = response.body.endPointData;
        expect(Array.isArray(endPointData)).toBe(false);
        expect(typeof endPointData).toBe("object");
      });
  });
  test("200, check if the key in each object matches the api path and contains information  ", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        const endPointData = response.body.endPointData;
        const arraKey = Object.keys(endPointData);
        expect(arraKey).toEqual([
          "GET /api",
          "GET /api/topics",
          "GET /api/articles",
        ]);
      });
  });
  test("200, check if each nested obj contains a description with a information inisde it  ", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        const endPointData = response.body.endPointData;
        const endPointKeys = Object.keys(endPointData);
        const everykeyHasDescriptionInfo = endPointKeys.every((key) => {
          if (endPointData[key].description !== null) {
            return true;
          }
        });

        expect(everykeyHasDescriptionInfo).toBe(true);
      });
  });
  test("200, check if each nested obj, other than GET /api, contains a queries key with a information inisde it  ", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        const endPointData = response.body.endPointData;
        const endPointKeys = Object.keys(endPointData);
        const firstElementRemodedArray = endPointKeys.slice(1);
        for (const key of firstElementRemodedArray) {
          expect(endPointData[key]).toHaveProperty("description");
        }
      });
  });
  test("200, check if response body has a specific struvture it wants you to follow ", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        const endPointData = response.body.endPointData;
        const exampleResponseKeys = Object.keys(endPointData);
        const firstElementRemodedArray = exampleResponseKeys.slice(1);
        let result = false;
        for (const key of firstElementRemodedArray) {
          const obj = endPointData[key].exampleResponse;
          const keyArr = Object.keys(obj);
          let objData = obj[keyArr[0]];
          if (Object.keys(objData).length > 0) {
            result = true;
          }
        }

        expect(result).toBe(true);
        //expect(endPointData.exampleResponse).toHaveProperty("articles")
      });
  });
  test("200, check if response body gives an example of what a response looks like  ", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        const endPointData = response.body.endPointData;
        const topicsResponseBodt =
          endPointData["GET /api/topics"].exampleResponse.topics;

        const articlesResponseBodt =
          endPointData["GET /api/articles"].exampleResponse.articles;

        const response1 =
          endPointJson["GET /api/topics"].exampleResponse.topics;
        const response2 =
          endPointJson["GET /api/articles"].exampleResponse.articles;
        expect(topicsResponseBodt).toEqual(response1);
        expect(articlesResponseBodt).toEqual(response2);
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
