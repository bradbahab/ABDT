document.addEventListener("DOMContentLoaded", event => {
	//window.localStorage.clear();	
	//admin.auth().revokeRefreshTokens();		
	
	const app = firebase.app();	
	const db = firebase.firestore();
	
	getMenuDates(db);
	
	generateContent(db, dateGen());	

		
	//**WORKS** Add document to collection	
	/* Add To Database
	db.collection("Products").add({
		Date: "Date",
		ImgURL: "testing",
		AssociateURL: "https://amzn.to/2Hc24S7",
		Title: "Title",
		Description: "Description",
		Price: "Price"
	})
	.then(function(docRef) {
		console.log("Document written with ID: ", docRef.id);
		alert("Products: Success");
	})
	.catch(function(error) {
		console.error("Error adding document: ", error);
		alert("Products: Failed");
	});
	
	*/


	
	/* **setAttribute** code example
	var video = document.createElement("iframe");
    video.setAttribute('title, "Test");
    video.setAttribute(width, "440");
    video.setAttribute(height, "390");
    video.setAttribute(src, "http://www.youtube.com/embed/" + videoID);
    video.setAttribute(frameborder, "0");

    var div_element = document.getElementById("video_div");

    div_element.appendChild(video);
	
	*/

	window.localStorage.clear();
});

/*===============
FUNCTIONS
===============*/



/*========
Func: 		getMenuDates()
Purpose: 	
========*/
function getMenuDates(db)
{
	const menuCollection = db.collection('Date');	
	const miniMenuCollection = db.collection('MenuDate');	
	
	var innerHTMLString = "";
	
	var d1 = "";
	var d2 = "";
	var d3 = "";
	var d4 = "";
	var d5 = "";
	var d6 = "";
	
	var m1 = "";
	var m2 = "";
	var m3 = "";
	var m4 = "";
	var m5 = "";
	
	
	//alert("test");
	menuCollection.get()
		.then(products => {
			products.forEach(doc => {
			data = doc.data();

			d1 = data.a;
			d2 = data.b;
			d3 = data.c;
			d4 = data.d;
			d5 = data.e;
			d6 = data.f;
			//alert(d1 + " " + d1 + " " + d3 + " " + d4 + " " + d5);
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
				
				innerHTMLString = dynamicNav(d1, d2, d3, d4, d5, m1, m2, m3, m4, m5);
	
				//alert(innerHTMLString);

				document.getElementById("nav").innerHTML = innerHTMLString;
			})		
		})
	})


	//alert(d1 + " " + d1 + " " + d3 + " " + d4 + " " + d5);
	

}


/*========
Func: 		testing()
Purpose: 	
========*/
function testing()
{
	alert("TESTING");
	
}

/*========
Func: 		dateClicked()
Purpose: 	Generate HTML code based on date clicked
========*/
function dateClicked(dateClicked)
{
	const app = firebase.app();	
	const db = firebase.firestore();
	
	generateContent(db, dateClicked.trim());
}

/*========
Func: 		generateContent(db, dateGen)
Purpose: 	Generate HTML code for id="dynamicContentContainer"
				with DB values
========*/
function generateContent(db, dateGen)
{
	document.getElementById("dynamicContentContainer").innerHTML = "";
	var innerHTMLString = "";
	var tempString = "";
	var temp;
	var temp2 = "";
	var breakForeach = 0;
	var DBdata;
	var strLength = 0;
	var dividend = 0;
	
	
	
	const collection = db.collection('Products').where("Date", "==", dateGen);	
	
	//alert("test");
	collection.get()
		.then(products => {
			products.forEach(doc => {
				data = doc.data()				
				temp = dynamicSubContent(data.ImgURL, data.AssociateURL, data.Price, data.Title, data.Description);
				
				//alert("test2");
				strLength = temp.toString().length;		
				//alert(strLength);
				
				dividend = strLength / 3; 
				
				tempString = temp.toString();
				tempString = tempString.substring(0, dividend);
				innerHTMLString += tempString;
				
			document.getElementById("dynamicContentContainer").innerHTML = innerHTMLString;
		
		})
	})
	
}


/*========
Func: 		dynamicSubContent(ImgURL, AssociateURL, Price, Title, Description)
Purpose: 	HTML product content code passed as a string
========*/
function dynamicSubContent(ImgURL, AssociateURL, Price, Title, Description)
{
	//alert("Dynamic Sub Content");
	
	var node = ''; 
	node = node.trim();
	for(i = 0; i < 3; i++)
	{
		node += '<div class="subContentContainer"><!-- Dynamic Content -->';
		node += 	'<div class="contentImage">';
		node +=			'<div class="block">';
		node += 			'<a id="imgAnchor" target="_blank" href=' +'"'+  AssociateURL + '"' + '"><img class="images"src=' +'"'+  ImgURL + '"' + '"/></a>';		
		node += 		'</div>';
		node += 	'</div>';	


		node += 	'<div class="contentInfo">';
		node +=			'<div class="block">';
		node +=				'<table id="table">';
		node +=					'<tr class="tblRow">';
		node +=						'<th id="priceLbl">Price:</th>';
		node +=						'<td id="priceValue">' + Price + ' </td>';
		node +=					'</tr>';
		node +=					'<tr class="tblRow">';
		node +=						'<th id="titleLbl">Title:</th>';
		node +=						'<td id="titleValue">' + Title +'</td>';
		node +=					'</tr>';
		node +=					'<tr class="tblRow">';
		node +=						'<th  id="descriptionLbl">Description:</th>';
		node +=						'<td id="descriptionValue">' + Description + '</td>';
		node +=					'</tr>';
		node +=				'</table>';

		node +=				'<a id=' +'"'+  AssociateURL + '"' + '"><button id="shopBtn">Go To Product</button></a>';

		node +=			'</div>';
		node +=		'</div>';
		node +=	'</div>';
	}
	
	return node;
}


/*========
Func: 		dynamicNav(ImgURL, AssociateURL, Price, Title, Description)
Purpose: 	HTML navigation code passed as a string
========*/
function dynamicNav(d1, d2, d3, d4, d5, m1, m2, m3, m4, m5)
{
	
	var node = ''; 
	node = node.trim();	
	
	node +=	'<div class="wrap-nav">';
	node +=		'<div class="menu">';
	node +=			'<div class="menuCentered">';
	node +=				'<div class="subMenuCentered">';
	node +=					'<ul id="menu">';
	node +=						'<li onclick=' + '"dateClicked(' + "'" + d1 + "'" + ')">' + m1 + '</li>';
	node +=						'<li onclick=' + '"dateClicked(' + "'" + d2 + "'" + ')">' + m2 + '</li>';
	node +=						'<li onclick=' + '"dateClicked(' + "'" + d3 + "'" + ')">' + m3 + '</li>';
	node +=						'<li onclick=' + '"dateClicked(' + "'" + d4 + "'" + ')">' + m4 + '</li>';
	node +=						'<li onclick=' + '"dateClicked(' + "'" + d5 + "'" + ')">' + m5 + '</li>';

	node +=					'</ul>';
	node +=				'</div>';
	node +=			'</div>';
	node +=		'</div>';
			
	node +=		'<div class="minimenu"><img src="images/menuButton1.gif" />';
	node +=			'<select onchange="location=this.value">';
	node +=				'<option></option>';
	node +=				'<option onclick=' + '"dateClicked(' + "'" +  d1 + "'" + ')">' +  m1 + '</option>';
	node +=				'<option onclick=' + '"dateClicked(' + "'" +  d2 + "'" + ')">' +  m2 + '</option>';
	node +=				'<option onclick=' + '"dateClicked(' + "'" +  d3 + "'" + ')">' +  m3 + '</option>';
	node +=				'<option onclick=' + '"dateClicked(' + "'" +  d4 + "'" + ')">' +  m4 + '</option>';
	node +=				'<option onclick=' + '"dateClicked(' + "'" +  d5 + "'" + ')">' +  m5 + '</option>';

	node +=			'</select>';
	node +=		'</div>';
	node +=	'</div>';	
	
	return node;
}




/*========
Func: 		dateGen()
Purpose: 	Return todays date
========*/
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


/*========
Func: 		pad2(number)
Purpose: 	Pad number to 2 placeholders
========*/
function pad2(number) {
	return (number < 10 ? '0' : '') + number;
}