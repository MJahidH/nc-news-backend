const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
     return   db.end();
});

describe("api/topics", () => {
 
  test("returns an array ", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((body) => {
        const arrayOfTopics = body.body.topics
        expect(Array.isArray(arrayOfTopics)).toBe(true);
      });
  });
  test("expect 200 status code , check if each obj in array has the keys slug and description  ", () => {
    return request(app)
      .get("/api/topics")

      .then((body) => {

        const arrayOfTopics = body.body.topics
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


describe.only("GET /api/articles/:article_id", () =>{
    
  test('returns article api ', () => {
    return request(app)
    .get("/api/articles")
    .expect(200)
  });
  test('returns article api ', () => {
    return request(app)
    .get("/api/articles/1")
    .expect(200)
    .then((body)=>{
      console.log(body)
      expect(body).toEqual(body)
    })
  });

});