const olList = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ id: sku, title: name, thumbnail: image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const createChild = async (product) => { // Pedi ajuda de um amigo, thiago Lopes, pois não estava retornando o meus items!
  const response = await fetchProducts(product);
  const items = document.querySelector('.items');

  response.results.forEach(({ id, title, thumbnail }) => {
    const addItems = createProductItemElement({ id, title, thumbnail });
    items.appendChild(addItems);
  });
};

const cartItemClickListener = (event) => {
  event.target.remove();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const addToCart = () => {
  const buttonAdd = document.querySelectorAll('.item__add');

  buttonAdd.forEach((product) => {
    product.addEventListener('click', async () => {
      const parentSection = getSkuFromProductItem(product.parentNode);
      const addToFetch = await fetchItem(parentSection);
      // console.log(addToFetch);
      const { id: sku, title: name, price: salePrice } = addToFetch;
      const addProducts = createCartItemElement({ sku, name, salePrice });
      olList.appendChild(addProducts);
    });
  });
};

window.onload = async () => {
  await createChild('celular');
  await addToCart();
};
