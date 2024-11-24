const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

//Endpoint that returns the person object with properties <http://localhost:3000/person>
let person = {
  firstName: 'Thrilok',
  lastName: 'Naidu',
  gender: 'male',
  age: 26,
  isMember: true,
};
app.get('/person', (req, res) => {
  res.json(person);
});

//Endpoint that returns the full name of the person <http://localhost:3000/person/fullname>

function getFullName(person) {
  return person.firstName + ' ' + person.lastName;
}
app.get('/person/fullname', (req, res) => {
  let fullName = getFullName(person);
  res.json({ fullName: fullName });
});

//Endpoint that access the first name and gender of the person <http://localhost:3000/personfirstname-gender>

function getFirstNameAndGender(person) {
  return {
    firstName: person.firstName,
    gender: person.gender
  }
}
app.get('/person/firstname-gender', (req, res) => {
  let firstnameAndGender = getFirstNameAndGender(person);
  res.json(firstnameAndGender);
});

//Endpoint for increment the age of the person and return theupdated object <http://localhost:3000/person/increment-age>

function getIncrementAge(person) {
  person.age = person.age + 1;
  return person;
}
app.get('/person/increment-age', (req, res) => {
  let incrementAge = getIncrementAge(person);
  res.json(incrementAge);
});

//Endpoint to return the full name and membership status of the person <http://localhost:3000/person/fullname-membership>

function getfullnameMembership(person) {
  return {
    fullName: getFullName(person),
    isMember: person.isMember
  }
}
app.get('/person/fullname-membership', (req, res) => {
  let fullnameMembership = getfullnameMembership(person);
  res.json(fullnameMembership);
});

//Endpoint to get final price after discount for members <http://localhost:3000/person/final-price?cartTotal=1000>

function getfinalPrice(cartTotal, isMember) {
  let finalPrice;
  if (isMember === true) {
    finalPrice = cartTotal - cartTotal * 0.1;
  } else {
    finalPrice = cartTotal;
  }
  return finalPrice;
  }

app.get('/person/final-price', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let finalPrice = getfinalPrice(cartTotal, person.isMember)
  res.json({ finalPrice: finalPrice});
});

//Endpoint to get shipping cost based on cart total and membership status <http://localhost:3000/person/shipping-cost?cartTotal=450>

function getShippingCost(cartTotal, isMember) {
  let finalShippingCost;
  if (cartTotal > 500 && isMember === true) {
    finalShippingCost = 0;
  } else {
    finalShippingCost = 99;
  }
  return finalShippingCost;
  }

app.get('/person/shipping-cost', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let shippingCost = getShippingCost(cartTotal, person.isMember);
  res.json({ shippingCost: shippingCost.toFixed(2)});
});

/// on arrays concept 
// Endpoint to return only the even numbers<http://localhost:3000/even-numbers


let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function filterEvenNumbers(num) {
  return num % 2 === 0;
}

app.get("/even-numbers", (req, res) =>{
  let result = numbers.filter((num) => filterEvenNumbers(num));
  res.json(result);
});

// Endpoint to return only ages greater than 18<http://localhost:3000/adult-ages


let ages = [10, 20, 30, 15, 17, 25];

function filterAgeisGreaterThan18(age) {
  return age > 18;
}

app.get("/adult-age", (req, res) => {
  let result = ages.filter((age) => filterAgeisGreaterThan18(age));
  res.json(result);
});

// Endpoint to return the words longer than 5 charactors from an array of words <http://localhost:3000/long-words

let words = ["apple", "banana", "cherry", "date", "fig", "grape"];

function filterWordsGreaterThanFiveChars(word) {
  return word.length > 5;
}

app.get("/long-words", (req, res) => {
  let result = words.filter((word) => filterWordsGreaterThanFiveChars(word));
  res.json(result);
});

// Endpoint taht return only the files smaller than a certain size from an array of file sizes. The size filter parameter should be read from the query string <http://localhost:3000/small-files?filterParam=100

let fileSizes = [50, 200, 75, 120, 30, 90, 150];

function filterSmallerFileSizes(fileSize, filterParam) {
  return fileSize < filterParam;
}

app.get("/small-files", (req, res) => {
  let filterParam = req.query.filterParam;
  let result = fileSizes.filter((fileSize) => filterSmallerFileSizes(fileSize, filterParam)
  );
  res.json(result);
});


// Endpoint that returns only the products in a specific caregory from  an array of products <http://localhost:3000/products/category/Electronics

let products = [
  { "name": "Laptop", "price": 50000, "category": "Electronics"},
  { "name": "Mobile", "price": 20000, "category": "Electronics"},
  { "name": "Shirt", "price": 1500, "category": "Apparel"},
  { "name": "Mixer Grinder", "price": 4000, "category": "Home Appliances"},

];

function filterByCategory(productObj, category) {
  return productObj.category === category;
}

app.get("/products/category/:category", (req, res) => {
  let category = req.params.category;
  let result = products.filter((productObj) => filterByCategory(productObj, category)
  );
  res.json(result);
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Endpoint that returns only the cars with mileage less than a specifies value from an array of cars  <http://localhost:3000/cars/mileage/20000

let cars = [
  { "make": "Maruti", "model": "Swift", "mileage": 15000},
  { "make": "Hyundai", "model": "i20", "mileage": 25000},
  { "make": "Tat", "model": "Swift", "mileage": 15000}
 

];

function filterByCategory(carObj, mileage) {
  return carObj.mileage < mileage;
}

app.get("/cars/mileage/:mileage", (req, res) => {
  let mileage = req.params.mileage;
  let result = cars.filter((carObj) => filterByCategory(carObj, mileage)
  );
  res.json(result);
});

// Endpoint that filter movies by rating   <http://localhost:3000/movies/rating/8

let movies = [
  { "title": " 3 Idiots", "genre": "Comedy", "rating": 9},
  { "title": " Dangal", "genre": "Drama", "rating": 10},
  { "title": "Bahubali", "genre": "Action", "rating": 8}
 

];

function filterByCategory(movieObj, rating) {
  return movieObj.rating > rating;
}

app.get("/movies/rating/:rating", (req, res) => {
  let rating = req.params.rating;
  let result = movies.filter((movieObj) => filterByCategory(movieObj, rating)
  );
  res.json(result);
});

// Endpoint that filter orders by status    <http://localhost:3000/movies/rating/8----

let orders = [
  {  orderId: 1,  customerName: "Thrilok",  status: "shipped" },
  {  orderId: 2, customerName: "Vidya", status: "pending" },
  { orderId: 3, customerName: "vishnu", status: "shipped" }
];

function filterByOrderStatus(orderObj, status) {
  return orderObj.status === status;
}

app.get("/orders/status/:status", (req, res) => {
  let status = req.params.status;
  let result = orders.filter((orderObj) => filterByOrderStatus(orderObj, status));
  res.json(result);
});

///sorting concept

//Endpoint in sort ages in ascending order

let agess = [25, 30, 18, 22, 27];

function sortAscendingOrder(age1, age2) {
  return age1 - age2;
}

app.get("/ages/sort-ascending", (req, res) => {
  let agesCopy = agess.slice();
  agesCopy.sort(sortAscendingOrder);
  res.json(agesCopy);
})

//Endpoint in sort ages in descending order

function sortDescendingOrder(age1, age2) {
  return age2 - age1;
}

app.get("/ages/sort-descending", (req, res) => {
  let agesCopy = agess.slice();
  agesCopy.sort(sortDescendingOrder);
  res.json(agesCopy);
})

//Endpoint in sort students by marks in descending order

let students = [
  {name: "Thrilok", rollNo: "55", marks: 977},
  {name: "vidya", rollNo: "57", marks: 980},
  {name: "vishnu", rollNo: "59", marks: 978},
];

function sortStudentMarksInDescendingOrder(student1,student2) {
  return student2.marks - student1.marks;
}

app.get("/students/sort-by-marks-descending", (req, res) => {
  let studentCopy = students.slice();
  studentCopy.sort(sortStudentMarksInDescendingOrder);
  res.json(studentCopy);
})

//Endpoint in sort cars by mileage in descending order
let carss = [
  {make: "Maruti", model: "Swift", mileage: 15},
  {make: "Hyundai", model: "i20", mileage: 18},
  {make: "Tata", model: "Nexon", mileage: 20},
]
function sortCarMileageInDescendingOrder(car1,car2) {
  return car2.mileage - car1.mileage;
}

app.get("/cars/sort-by-mielage-descending", (req, res) => {
  let carsCopy = carss.slice();
  carsCopy.sort(sortCarMileageInDescendingOrder);
  res.json(carsCopy);
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
