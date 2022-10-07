import axios from "axios";
import cheerio from "cheerio";

const url = `https://books.toscrape.com/`;

const getGenre = async () => {
  try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    const books = $("article");
    const book_data = [];

    books.each(function () {
      let title = $(this).find("h3 a").text();
      let price = $(this).find(".price_color").text();
      let stock = $(this).find(".availability").text().trim();

      book_data.push({ title, price, stock });
    });

    console.log(book_data);
  } catch (err) {
    console.log(err);
  }
};

getGenre();
