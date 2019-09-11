/* ( 1 ) ==========================================================
Func: 		db()
Purpose: 	Delete rows of data
========*/
function db()
{	
	associateURL =  document.getElementById("AssociateURL").value;
	imgURL = document.getElementById("ImgURL").value;
	title = document.getElementById("Title").value;
	description = document.getElementById("Description").value;
	price = document.getElementById("Price").value;
	
	//window.localStorage.clear();	
	//admin.auth().revokeRefreshTokens();		
	
	const app = firebase.app();	
	const db = firebase.firestore();
	const menuCollection = db.collection('Date');
	
	AddProductData(date, imgURL, associateURL, title, description, price);
	
	//Delete daysix Product  
		// function 
		deleteDaySix();
	
	//Update Date
		// function 
		updateDates();
	
	//Update Menu Date
		//function 
		updateMenuDates();
	
	
	window.localStorage.clear();
}


/* ( 2 ) ==========================================================
Func: 		AddProductData(date, imgURL, associateURL, title, description, price)
Purpose: 	
========*/
function AddProductData(date, imgURL, associateURL, title, description, price)
{

	const app = firebase.app();	
	var db = firebase.firestore();
	
	// Add a new document with a generated id.
	db.collection("Products").add({
		Date: date,
		ImgURL: imgURL,
		AssociateURL: associateURL,
		Title: title,
		Description: description,
		Price: price
	})
	.then(function(docRef) {
		console.log("Document written with ID: ", docRef.id);
		//alert("Products: Success");
	})
	.catch(function(error) {
		console.error("Error adding document: ", error);
		//alert("Products: Failed");
	});
}


/* ( 3 ) ==========================================================
Func:	updateMenuDates()
Purpose: 	
========*/
function updateMenuDates()
{
	const app = firebase.app();	
	var db = firebase.firestore();
	const miniMenuCollection = db.collection("MenuDate");	
	
	var innerHTMLString = "";
	
	var m1 = "";
	var m2 = "";
	var m3 = "";
	var m4 = "";
	var m5 = "";
	
	var today = menuDateGen();
	
	miniMenuCollection.get()
	.then(products => {
			products.forEach(doc => {
			data = doc.data()

			m1 = data.a;
			m2 = data.b;
			m3 = data.c;
			m4 = data.d;
			m5 = data.e;	

			
			
		})
		db.collection("MenuDate").doc("F2kAwQGoAYItudMcHCVx").set({
			a: today,
			b: m1,
			c: m2,
			d: m3,
			e: m4
		})
		.then(function() {
			console.log("Document successfully written!");
		})
		.catch(function(error) {
			console.error("Error writing document: ", error);
		});
	})	

}


/* ( 4 ) ==========================================================
Func: 		updateDates()
Purpose: 	
========*/
function updateDates()
{
	const app = firebase.app();	
	var db = firebase.firestore();
	const dateCollection = db.collection("Date");	
	
	var innerHTMLString = "";
	
	var d1 = "";
	var d2 = "";
	var d3 = "";
	var d4 = "";
	var d5 = "";
	var d6 = "";
	
	var today = dateGen();
	
	dateCollection.get()
	.then(products => {
			products.forEach(doc => {
			data = doc.data()

			d1 = data.a;
			d2 = data.b;
			d3 = data.c;
			d4 = data.d;
			d5 = data.e;	
			d6 = data.f;				
		})
		db.collection("Date").doc("aHRs9V2TOoRxmxJdBkSu").set({
			a: today,
			b: d1,
			c: d2,
			d: d3,
			e: d4,
			f: d5
		})
		.then(function() {
			console.log("Document successfully written!");
		})
		.catch(function(error) {
			console.error("Error writing document: ", error);
		});
	})	

}


/* ( 5 ) ==========================================================
Func: 		updateDates()
Purpose: 	
========*/
function deleteDaySix()
{
	const app = firebase.app();	
	var db = firebase.firestore();
	const dateCollection = db.collection("Date");	

	
	var daysix = "";
	
	
	dateCollection.get()
	.then(products => {
			products.forEach(doc => {
			data = doc.data()
			
			daysix = data.f;				
		})
		
		const productsCollection = db.collection("Products").where("Date", "==", daysix);

		productsCollection.get().then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
		doc.ref.delete();
	  });
	});
		
		

	})	

}


/*==========================================================
/*==================GENERAL FUNCTIONS=======================
/*==========================================================

/* ( 6 ) ==========================================================
Func: 		dateGen()
Purpose: 	Return todays date
===========================================================*/
function dateGen()
{
	var formattedDate;
	var day;
	var month;
	var year;
	
	var d = new Date();
	
	day = d.getDate().toString();
	month = d.getMonth();
	month++;
	year = d.getFullYear();	
	formattedDate =  year + "-" + pad2(month) + "-" + day;
	return formattedDate;
}


/* ( 7 ) ==========================================================
Func: 		
Purpose: 	
========*/
function menuDateGen()
{
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	var d = new Date();
	var date = d.getDate();
	var day = d.getDay();

	var menuDate = days[day].substring(0,3) + " " + date;

	return menuDate; 
}


/* ( 8 ) ==========================================================
Func: 		pad2(number)
Purpose: 	Pad number to 2 placeholders
========*/
function pad2(number) {
	return (number < 10 ? '0' : '') + number;
}



/*==========================================================
/*====== SAMPLE DATA ==SAMPLE DATA== SAMPLE DATA ===========
/*==========================================================

/* ( 9 ) ==========================================================
Func: 		AddSampleData()
Purpose: 	Delete rows of data
========*/
function AddSampleData()
{

	const app = firebase.app();	
	var db = firebase.firestore();

	var imgURL1 = "https://images-na.ssl-images-amazon.com/images/I/61EYO7FZwSL._SL1000_.jpg";
	var imgURL2 = "https://images-na.ssl-images-amazon.com/images/I/61rwEt%2Bu9GL._SL1200_.jpg";
	var imgURL3 = "https://images-na.ssl-images-amazon.com/images/I/61RWmOgUYyL._SL1000_.jpg";
	var imgURL4 = "https://images-na.ssl-images-amazon.com/images/I/61m2A8pFFSL._SL1200_.jpg";
	var imgURL5 = "https://images-na.ssl-images-amazon.com/images/I/61wNFJQRVaL._SL1500_.jpg";
	var imgURL6 = "https://images-na.ssl-images-amazon.com/images/I/914M2TvVA1L._SL1500_.jpg";
	var imgURL7 = "https://images-na.ssl-images-amazon.com/images/I/71DvG2FjM%2BL._SL1500_.jpg";
	
	var associateURL = "#";
	var title = "Sample Data Sample Data Sample Data";
	var description = "Sample Data Sample Data Sample Data";
	var price = "479.97";
	
	
	
	// Add a new document with a generated id.
	AddProductData(dateGen(), imgURL1, associateURL, title, description, price);
	AddProductData(dateGen(), imgURL6, associateURL, title, description, price);
	AddProductData(dateGen(), imgURL7, associateURL, title, description, price);
	AddProductData('2019-08-27', imgURL2, associateURL, title, description, price);
	AddProductData('2019-08-26', imgURL3, associateURL, title, description, price);
	AddProductData('2019-08-25', imgURL4, associateURL, title, description, price);
	AddProductData('2019-08-24', imgURL5, associateURL, title, description, price);
}


/* ( 11 ) ==========================================================
Func: 		addSampleDates()
Purpose: 	
========*/
function addSampleDates()
{
	const app = firebase.app();	
	var db = firebase.firestore();
	const dateCollection = db.collection("Date");	
	
		var today = dateGen();
	

		db.collection("Date").doc("aHRs9V2TOoRxmxJdBkSu").set({
			a: today,
			b: "2019-08-27",
			c: "2019-08-26",
			d: "2019-08-25",
			e: "2019-08-24",
			f: "2019-08-23"
		})
		.then(function() {
			console.log("Document successfully written!");
		})
		.catch(function(error) {
			console.error("Error writing document: ", error);
		});
}


/* ( 12 ) ========
Func: 		deleteAllSampleRows(val)
Purpose: 	Delete all sample rows of data
========*/
function deleteAllSampleData()
{
	
	deleteSampleRows(dateGen());
	deleteSampleRows('2019-08-28');
	deleteSampleRows('2019-08-27');
	deleteSampleRows('2019-08-26');
	deleteSampleRows('2019-08-25');
	deleteSampleRows('2019-08-24');
}


/* ( 13 ) ========
Func: 		deleteAllSampleRows(val)
Purpose: 	Delete all sample rows of data
========*/
function deleteSampleRows(val)
{

	const app = firebase.app();	
	var db = firebase.firestore();
	
	var products = db.collection('Products').where("Date", "==", val);	

	
	products.get().then(function(querySnapshot) {
	  querySnapshot.forEach(function(doc) {
		doc.ref.delete();
	  });
	});
}



