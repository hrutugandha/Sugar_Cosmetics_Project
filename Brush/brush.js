var brushData = JSON.parse(localStorage.getItem("brushData"));
var cartArr = JSON.parse(localStorage.getItem("cartItems")) || [];
var wishlistArr = JSON.parse(localStorage.getItem("listItems")) || []

displayData(brushData);

function filter(){
   
    var selected = document.querySelector("#filter").value;
    var filterList = brushData.filter(function (elem){
        return elem.product==selected;
    })
    displayData(filterList)
    document.querySelector("#displayitem").textContent=`Brush - ${filterList.length} items`
}

function handlerPriceSort(){
    var selected = document.querySelector("#priceSort").value;
    // console.log(selected);
    if(selected=="high"){
        brushData.sort(function (a,b){
            return b.price-a.price;
        })
    }
    if(selected=="low"){
        brushData.sort(function (a,b){
            return a.price-b.price
        })
    }
    if(selected=="rel"){
        brushData.sort(function (a,b){
            return b.rating-a.rating;
        })
    }
    displayData(brushData)
}
document.querySelector("#displayitem").textContent=`Brush - ${brushData.length} items`

function displayData(brushData ){
    // event.preventDefault();
document.querySelector("#container-prod").innerHTML = ""
brushData.map(function (elem){

    

    var div = document.createElement("div");
    div.setAttribute("id","main")
   
    var img = document.createElement("img");
    img.setAttribute("src", elem.image_url);
    img.setAttribute("id","image")

    var head = document.createElement("p");
    head.setAttribute("id","textCenter");
    head.textContent = elem.name;

    var p = document.createElement("p");
    p.textContent = `Rs. ${elem.price} `
    p.setAttribute("id","textCenter");
     
    var div1 = document.createElement("div");
    div1.setAttribute("id","flex")

    var img1 = document.createElement("img");
    img1.setAttribute("src", elem.star_url);
    img1.setAttribute("id","star")

    var p1 = document.createElement("p");
    p1.textContent = elem.rating;
    head.setAttribute("id","textCenter");

    var p2 = document.createElement("p");
    p2.textContent = elem. reviews;
    head.setAttribute("id","textCenter");

    var div2 = document.createElement("div");
    div2.setAttribute("id","flex1");

    var btn = document.createElement("button");
    btn.setAttribute("id","btn")
    btn.textContent = "WISHLIST"
    btn.addEventListener("click",function(){
        wishList(elem)
    })

    var btn1 = document.createElement("button");
    btn1.textContent = "Add to cart";
    btn1.addEventListener("click",function(){
        addToCart(elem)
    })
    btn1.setAttribute("id","btn1")
    div2.append(btn,btn1)
    div1.append(img1,p1,p2)
    div.append(img,head,p,div1,div2);
    document.querySelector("#container-prod").append(div)
})
}

function addToCart(elem){
    console.log(elem)
    cartArr.push(elem)
    localStorage.setItem("cartItems", JSON.stringify(cartArr));
    alert("Item added to cart")
   
}

function wishList(elem){
    // console.log("Done")
    // console.log(elem)
    wishlistArr.push(elem)
    localStorage.setItem("listItems", JSON.stringify(wishlistArr));
    alert("Item added to wish list")
}