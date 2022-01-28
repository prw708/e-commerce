import { createRouter, createWebHistory } from 'vue-router'
import AllListings from '../components/AllListings.vue';
import AddProduct from '../components/AddProduct.vue';
import Category from '../components/Category.vue';
import Product from '../components/Product.vue';
import Checkout from '../components/Checkout.vue';
import NotFound from '../components/NotFound.vue';

const categories = [
  'Category 1',
  'Cartesian',
  'Recipes',
];

const listings = [
  [
    { title: 'Title 1.1', owner: { username: 'testuser' }, image: '/product_image.png', price: '10.99', description: 'Product 1 description' },
    { title: 'Title 1.2', owner: { username: 'testuser' }, image: '/product_image.png', price: '12.99', description: 'Product 2 description' },
    { title: 'Title 1.3', owner: { username: 'testuser' }, image: '/product_image.png', price: '2.99', description: 'Product 3 description' },
    { title: 'Title 1.4', owner: { username: 'testuser' }, image: '/product_image.png', price: '2.99', description: 'Product 4 description' },
    { title: 'Title 1.5', owner: { username: 'testuser' }, image: '/product_image.png', price: '112.99', description: 'Product 5 description' },
  ],
  [
    { title: 'Title 2.1', owner: { username: 'testuser' }, image: '/product_image.png', price: '10.99', description: 'Product 1 description' },
    { title: 'Title 2.2', owner: { username: 'testuser' }, image: '/product_image.png', price: '12.99', description: 'Product 2 description' },
    { title: 'Title 2.3', owner: { username: 'testuser' }, image: '/product_image.png', price: '2.99', description: 'Product 3 description' },
  ],
  [
    { title: 'Title 3.1', owner: { username: 'testuser' }, image: '/product_image.png', price: '10.99', description: 'Product 1 description' },
    { title: 'Title 3.2', owner: { username: 'testuser' }, image: '/product_image.png', price: '12.99', description: 'Product 2 description' },
    { title: 'Title 3.3', owner: { username: 'testuser' }, image: '/product_image.png', price: '2.99', description: 'Product 3 description' },
    { title: 'Title 3.4', owner: { username: 'testuser' }, image: '/product_image.png', price: '2.99', description: 'Product 4 description' },
  ],
];

const routes = [
  { 
    path: '/', 
    alias: '',
    name: 'home', 
    component: AllListings, 
    props: { categories: categories, listings: listings },
  },
  { 
    path: '/add', 
    name: 'add', 
    component: AddProduct, 
    props: { categories: categories },
  },
  { 
    path: '/checkout', 
    name: 'checkout', 
    component: Checkout, 
    props: false,
  },
  { 
    path: '/category/:category', 
    name: 'category', 
    component: Category,
    props: categoryProps,
    beforeEnter: (to) => {
      var existingCategory = false;
      for (var i = 0; i < categories.length; i++) {
        if (categories[i].replace(' ', '-').toLowerCase() === to.params.category) {
          existingCategory = true;
        }
      }
      if (!existingCategory) {
        return {
          name: 'notfound',
          params: { 
            path: to.path.substring(1).split('/'), 
            category: to.params.category 
          },
        };
      }
    },
  },
  { 
    path: '/category/:category/product/:product', 
    name: 'product', 
    component: Product,
    props: productProps,
    beforeEnter: (to) => {
      var existingCategory = false, existingProduct = false;
      var categoryIndex = 0;
      for (var i = 0; i < categories.length; i++) {
        if (categories[i].replace(' ', '-').toLowerCase() === to.params.category) {
          existingCategory = true;
          categoryIndex = i;
        }
      }
      for (var j = 0; j < listings[categoryIndex].length; j++) {
        if (listings[categoryIndex][j].title.replace(' ', '-').toLowerCase() === to.params.product) {
          existingProduct = true;
        }
      }
      if (!existingCategory || !existingProduct) {
        return {
          name: 'notfound',
          params: { 
            path: to.path.substring(1).split('/'), 
            category: to.params.category, 
            product: to.params.product 
          },
        };
      }
    },
  },
  { 
    path: '/:path(.*)*', 
    name: 'notfound', 
    component: NotFound,
    props: false,
  },
];

function categoryProps(route) {
  var category = '';
  var categoryIndex = 0;
  var productsCount = [];
  for (var i = 0; i < categories.length; i++) {
    if (categories[i].replace(' ', '-').toLowerCase() === route.params.category) {
      category = categories[i];
      categoryIndex = i;
    }
  }
  for (var j = 0; j < listings[categoryIndex].length; j++) {
    productsCount[j] = j;
  }
  return {
    category: category,
    listing: listings[categoryIndex],
    productsCount: productsCount,
  };
}

function productProps(route) {
  var category = '';
  var categoryIndex = 0;
  var product = null;
  for (var i = 0; i < categories.length; i++) {
    if (categories[i].replace(' ', '-').toLowerCase() === route.params.category) {
      category = categories[i];
      categoryIndex = i;
    }
  }
  for (var j = 0; j < listings[categoryIndex].length; j++) {
    if (listings[categoryIndex][j].title.replace(' ', '-').toLowerCase() === route.params.product) {
      product = listings[categoryIndex][j];
    }
  }
  return {
    category: category,
    product: product,
  };
}

const router = createRouter({
  history: createWebHistory('/projects/e-commerce'),
  routes
});

export default router
