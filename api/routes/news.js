import express from "express";
import axios from "axios";
import cheerio from "cheerio";
const router = express.Router();
import request from "request";
import { isOneOfTheElementsExists } from "../../helper/index.js";

const url1 = `https://sonxeber.az`;
const url2 = `https://apa.az/az`;

router.post("/", (req, res, next) => {
  let book_data = [];
  try {
    request(url2, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        let $ = cheerio.load(body);
        let books = $(".three_columns_block .item");

        books.each(function () {
          let title = $(this).find("h2").text();
          let img = $(this).find(".img img").attr("src");
          let href = $(this).attr("href");
          book_data.push({ title, img: img, href });
        });
        try {
          request(url1, (error, response, body) => {
            if (!error && response.statusCode === 200) {
              let $ = cheerio.load(body);
              let books = $(".nart");

              books.each(function () {
                let title = $(this).find("h3").text();
                let img = $(this).find(".imgholder img").attr("src");
                let href = $(this).find(".thumb_zoom").attr("href");
                book_data.push({ title, img: url1 + img, href: url1 + href });
              });
              // if (req.query.tag) {
              //   res
              //     .status(200)
              //     .json(
              //       book_data.filter(
              //         (item) =>
              //           item.title
              //             .toLowerCase()
              //             .indexOf(req.query.tag.toLowerCase()) != -1
              //       )
              //     );
              //
              if (req.body.tags) {
                console.log(req.body.tags);
                res
                  .status(200)
                  .json(
                    book_data.filter((item) =>
                      isOneOfTheElementsExists(
                        item.title.toLowerCase(),
                        req.body.tags
                      )
                    )
                  );
              } else res.status(200).json(book_data);
            }
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
});

export default router;

const getGenre = async () => {
  //     let res = await axios.get(url2);
  //   try {
  //     let res = await axios.get(url2);
  //     let $ = cheerio.load(res.data);
  //     let books = $(".three_columns_block .item");
  //     // console.log(books);
  //     books.each(function () {
  //       let title = $(this).find("h2").text();
  //       let img = $(this).find(".img img").attr("src");
  //       let href = $(this).attr("href");
  //       book_data.push({ title, img: img, href });
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   try {
  //     let res = await axios.get(url1);
  //     let $ = cheerio.load(res.data);
  //     let books = $(".nart");
  //     // console.log(books);
  //     books.each(function () {
  //       let title = $(this).find("h3").text();
  //       let img = $(this).find(".imgholder img").attr("src");
  //       let href = $(this).find(".thumb_zoom").attr("href");
  //       book_data.push({ title, img: url1 + img, href: url1 + href });
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
};
