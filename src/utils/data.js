import axios from "axios";
import defaultAttractions from "../assets/image/default-attractions.jpg";
import defaultFood from "../assets/image/default-food.jpg";
import defaultMasjid from "../assets/image/default-masjid.jpg";
import defaultMusolla from "../assets/image/default-musolla.jpg";

const mgwRequests = {
    axiosBase: axios.create({
        baseURL: "http://localhost:3388"
    }),
    dataPaths: {
        countries: "/countries/cities",
        categories : "/categories/subcats",
        articles: "/articles"
    },
    queryPaths: {
        countries: "/countries",
        countriesCities: "/countries/cities",
        categories : "/categories",
        categoriesSubcats : "/categories/subcats",
        articles: "/articles"
    },
    submitPaths: {
        article: "/article",
        rating: "/article/rating",
        comment: "/article/comment"         
    }
}

const mgwCategoriesMap = {
    attractions: {
        title: "Islamic Attractions",
        value: "attractions",
        banner: "",
        default: defaultAttractions
    },
    masjids: {
        title: "Mosques",
        value: "masjids",
        banner: "",
        default: defaultMasjid
    },
    food: {
        title: "Food",
        value: "food",
        banner: "",
        default: defaultFood
    },
    musollahs: {
        title: "Praying Spaces",
        value: "musollahs",
        banner: "",
        default: defaultMusolla
    }
}

const getMgwData = async () => {
    let gCountries = mgwRequests.axiosBase.get(mgwRequests.dataPaths.countries);
    let gCategories = mgwRequests.axiosBase.get(mgwRequests.dataPaths.categories);
    let gArticles = mgwRequests.axiosBase.get(mgwRequests.dataPaths.articles);
    let data = {};

    await Promise.all([gCountries, gCategories, gArticles]).then(r => {
      data = {
        countries: r[0].data,
        categories: r[1].data,
        articles: r[2].data
      };
    }).catch(err => {
      console.log("Cannot get data from APIs. Please contact administrator.");
    });

    return data;
}

const getArticles = async (params) => {
  return await mgwRequests.axiosBase.get(mgwRequests.queryPaths.articles, { params });
}

const getCountries = async (params) => {
  return await mgwRequests.axiosBase.get(mgwRequests.queryPaths.countries, { params });
}

const getCategories = async (params) => {
  return await mgwRequests.axiosBase.get(mgwRequests.queryPaths.categories, { params });
}

export { mgwCategoriesMap, getMgwData, getArticles, getCountries, getCategories };