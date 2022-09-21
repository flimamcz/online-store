export async function getCategories() {
  const ENDPOINT = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(ENDPOINT);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const ENDPOINT_CATEGORY = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const ENDPOINT_QUERY = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const ENDPOINT = categoryId ? ENDPOINT_CATEGORY : ENDPOINT_QUERY;
  const response = await fetch(ENDPOINT);
  const data = await response.json();
  return data;
}

export async function getProductById(id) {
  const ENDPOINT_ID = ` https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(ENDPOINT_ID);
  const data = await response.json();
  return data;
}
