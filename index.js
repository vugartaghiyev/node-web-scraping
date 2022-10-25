import axios from "axios";
import cheerio from "cheerio";

const url1 = `https://sonxeber.az`;
const url2 = `https://apa.az/az`;
const book_data = [];

const getGenre = async () => {
  try {
    let res = await axios.get(url2);
    let $ = cheerio.load(res.data);

    let books = $(".three_columns_block .item");
    // console.log(books);
    books.each(function () {
      let title = $(this).find("h2").text();
      let img = $(this).find(".img img").attr("src");
      let href = $(this).attr("href");

      book_data.push({ title, img: url2 + img, href });
    });
  } catch (err) {
    console.log(err);
  }

  try {
    let res = await axios.get(url1);
    let $ = cheerio.load(res.data);

    let books = $(".nart");
    // console.log(books);
    books.each(function () {
      let title = $(this).find("h3").text();
      let img = $(this).find(".imgholder img").attr("src");
      let href = $(this).find(".thumb_zoom").attr("href");

      book_data.push({ title, img: url1 + img, href: url1 + href });
    });
  } catch (err) {
    console.log(err);
  }
  console.log(book_data);
};

getGenre();
