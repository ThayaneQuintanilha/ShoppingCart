const fetchProducts = async () => {
  try {
    const response = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
    const jsonApi = await response.json();
    return jsonApi;
  } catch(error) {
    return error("You must provide an url");
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
