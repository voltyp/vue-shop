var webstore = new Vue({
  el: '#app',
  data: {    
    sitename: 'Vue.js Pet Depot', 
    showProduct: true,
    states: {
      AL: 'Alabama',
      AR: 'Arizona',
      CA: 'California',
      NV: 'Nevada'
    },
    order: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      method: 'Home Address',
      home: 'Home Address',
      business: 'Business Address', 
      gift: 'Send As A Gift',
      sendGift: 'Send As A Gift',
      dontSendGift: 'Do not Send As A Gift',
      
    },
    products: [],    
    cart: []
  },
  methods: {
    checkRating(n, myProduct) {
      return myProduct.rating - n >= 0;
    },
    addToCart(aProduct) {
      this.cart.push(aProduct.id);
    },
    showCheckout() {
      this.showProduct = this.showProduct ? false : true; 
    },
    submitForm() {
      alert('Submit');
    },
    canAddToCart(aProduct) {
      return aProduct.availableInventory > this.cartCount(aProduct.id);
    },
    cartCount(id) {
      let count = 0;
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === id) {
          count++;
        }
      }
      return count;
    }
  },
  computed: {
    cartItemCount: function() {
      return this.cart.length || '';
    },
    sortedProducts() {
      if(this.products.length > 0) {
        let productsArray = this.products.slice(0);
        function compare(a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase())
            return -1;
          if(a.title.toLowerCase() > b.title.toLowerCase())
            return 0;
        }
        return productsArray.sort(compare);
      }
    }
  },
  filters: {
    formatPrice: function(price) {
      if (!parseInt(price)) {return "";}
      if (price > 9999) {
        var priceString = (price / 100).toFixed(2);
        var priceArray = priceString.split("").reverse();
        var index = 3;
        while (priceArray.length > index + 3) {
          priceArray.splice(index+3,0,",");
          index +=4;
        }
        return "$" + priceArray.reverse().join("");
      } else {
        return "$" + (price / 100).toFixed(2);
      }
    }    
  },
  created: function() {	
    axios.get('products.json').then((response) =>{
        this.products=response.data.products;	
        console.log(this.products);
    });
    
  }
});	