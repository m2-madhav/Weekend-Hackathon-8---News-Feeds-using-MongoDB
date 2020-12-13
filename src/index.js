const express = require("express");
const app = express();
const port = 8080;

const onePageArticleCount = 10;

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/newFeeds/", (req, res) => {
  let limit =
    isNaN(req.query.limit) || !req.query.limit
      ? onePageArticleCount
      : parseInt(req.query.limit);
  let offset =
    isNaN(req.query.offset) || !req.query.offset
      ? onePageArticleCount
      : parseInt(req.query.offset);
  console.log(limit);
  console.log(offset);

  newsArticleModel
    .find()
    .limit(limit)
    .skip(offset)
    .then((newFeed) => res.send(newFeed));
  return;
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
