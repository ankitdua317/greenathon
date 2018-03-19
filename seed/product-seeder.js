var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping');

var products = [
	new Product({
		imagePath : 'https://images-na.ssl-images-amazon.com/images/I/418GfzfA-iL._SX425_.jpg',
		title : 'FC Barcelona Phone Cover',
		description : 'For iPhoneX',
		price : 30
	}),
	new Product({
		imagePath : 'https://i.ebayimg.com/images/g/8ZsAAOSwx2dYGmi3/s-l300.jpg',
		title : 'Ronaldo Phone Cover',
		description : 'For Samsung Galaxy S-8',
		price : 10
	}),
	new Product({
		imagePath : 'https://cdn-img-1.wanelo.com/p/15f/2d0/837/2904604855d20963b16e6de/x354-q80.jpg',
		title : 'FC Bayern Phone Cover',
		description : 'For iPhone 4',
		price : 15
	}),
	new Product({
		imagePath : 'http://stat.homeshop18.com/homeshop18/images/productImages/462/snoogg-samsung-galaxy-s4-mobile-back-case-red-manchester-united-logo-rpc-097-s4-medium_c3993681931eed79be8b32b5b52b8f32.jpg',
		title : 'Manchester United Phone Cover',
		description : 'For Samsung Galaxy S-4',
		price : 18
	}),
	new Product({
		imagePath : 'https://ae01.alicdn.com/kf/HTB1idCnSpXXXXcjXVXXq6xXFXXXq/ARSENAL-FC-Phone-Cases-Cover-For-1-One-Plus-2-X-For-Motorola-Moto-E-G.jpg',
		title : 'Arsenal Phone Cover',
		description : 'For One Plus 2',
		price : 12
	}),
	new Product({
		imagePath : 'https://www.yourprint.in/wp-content/uploads/2017/07/lp_2607_moto_e4_plus-510x600.jpg',
		title : 'Liverpool Phone Cover',
		description : 'For Moto E4 Plus',
		price : 20
	})
];

var done =0;
for(var i = 0; i< products.length; i++){
	products[i].save(function(err,result){
		if (done === products.length){
			exit();
		}			
	});
}

function exit(){
	mongoose.disconnect();
}
