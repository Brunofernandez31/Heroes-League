const mainController = {
  async renderHomePage(req, res) {
    try {
      const articles = await datamapper.getLatestsProducts();
      res.render("pages/home", { articles });
    } catch (error) {
      console.error(error);
      res.status(500).render("pages/error");
    }
  },

  async renderCatalogPage(req, res) {
    try {
      const articles = await datamapper.getAllAvailableProducts();
      const categories = await datamapper.getAllCategories();
      res.render("pages/catalog", { articles, categories });
    } catch (error) {
      console.error(error);
      res.status(500).render("pages/error");
    }
  },

  async renderCoffeeDetailsPage(req, res, next) {
    try {
      const articleId = parseInt(req.params.id);
      if (isNaN(articleId)) {
        return next();
      }

      const article = await datamapper.getProductById(articleId);
      if (!article) {
        return next();
      }

      res.render("pages/article", { article });
    } catch (error) {
      console.error(error);
      res.status(500).render("pages/error");
    }
  },
};