const fetchItem = async (itemId) => {
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${itemId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
