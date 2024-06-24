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

describe.only-("api/topics", () => {
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
  describe("GET /api/articles/articles_id", () => {
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

describe("GET /api/articles/:article_id/comments", () => {
  test("200, returns an array of comments related to the requested article", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((res) => {
        const arrayOfArticles = res.body.data;
        const correctArticle = arrayOfArticles.every((obj) => {
          return (obj.article_id = 1);
        });
        expect(correctArticle).toEqual(true);
      });
  });
  test("200,check each comment has expected properties", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((res) => {
        const arrayOfComments = res.body.data;
        for (const obj of arrayOfComments) {
          expect(obj).toHaveProperty("comment_id");
          expect(obj).toHaveProperty("votes");
          expect(obj).toHaveProperty("created_at");
          expect(obj).toHaveProperty("author");
          expect(obj).toHaveProperty("body");
          expect(obj).toHaveProperty("article_id");
        }
      });
  });
  test("200, check comments are sorted in descended order by created_at", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((res) => {
        const arrayOfComments = res.body.data;
        expect(arrayOfComments).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
  test("400,bad requests ", () => {
    return request(app)
      .get("/api/articles/jj/comments")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toEqual("Bad Request");
      });
  });
  test("404, article number not found/does not exist ", () => {
    return request(app)
      .get("/api/articles/500/comments")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toEqual("Not Found");
      });
  });
});

describe("POST /api/articles/:article_id/comments ", () => {
  test("201 checkif response has all the keys expected ", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({ username: "butter_bridge", body: "im ill" })
      .expect(201)
      .then((res) => {
        const comment = res.body.comment;
        expect(comment).toHaveProperty("author");
        expect(comment).toHaveProperty("body");
        expect(comment).toHaveProperty("article_id");
        expect(comment).toHaveProperty("comment_id");
        expect(comment).toHaveProperty("votes");
        expect(comment).toHaveProperty("created_at");
      });
  });
  test("400, article number not found/does not exist ", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({ username: "butter_bridges" })
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not Found");
      });
  });
  test("404,user name not found ", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .expect(404)
      .send({ username: "butter", body: "i am ill" })

      .then((res) => {
        expect(res.body.msg).toBe("Bad Request");
      });
  });
});

describe(" PATCH /api/articles/:article_id", () => {
  test("vote number has been updated", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 3 })
      .expect(200)
      .then((res) => {
        const articleData = res.body.data;
        expect(articleData).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 103,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
  test("404,ARTICLE ID IS INVALID bad request ", () => {
    return request(app)
      .patch("/api/articles/999999")
      .expect(404)
      .send({ inc_votes: 3 })
      .then((res) => {
        expect(res.body.msg).toBe("Not Found");
      });
  });
  test("400,ARTICLE ID IS INVALID bad request ", () => {
    return request(app)
      .patch("/api/articles/jj")
      .expect(400)
      .send({ inc_votes: 3 })
      .then((res) => {
        expect(res.body.msg).toBe("Bad Request");
      });
  });
  test("400 req body is incomplete bad request", () => {
    return request(app)
      .patch("/api/articles/jj")
      .expect(400)
      .send({ inc: 3 })
      .then((res) => {
        expect(res.body.msg).toBe("Bad Request");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("200, check if row was deleted", () => {
    return request(app)
      .delete("/api/comments/7")
      .expect(204)
      .then(() => {
        return request(app)
          .get("/api/articles/7/comments")
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe("Not Found");
          });
      });
  });
  test("400 article id does not exist ", () => {
    return request(app)
      .delete("/api/comments/999999")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not Found");
      });
  });
  test("400,  id is invalid ", () => {
    return request(app)
      .delete("/api/comments/jj")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad Request");
      });
  });
});

// link
// postgresql://postgres:[YOUR-PASSWORD]@db.dyivksoohagaiozmtabm.supabase.co:5432/postgres
