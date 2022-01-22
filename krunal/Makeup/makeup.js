var makeupData = JSON.parse(localStorage.getItem("makeupData"));
var cartArr = JSON.parse(localStorage.getItem("cartItems")) || [];
var wishlistArr = JSON.parse(localStorage.getItem("listItems")) || []

displayData(makeupData);

function filter(){
    var selected = document.querySelector("#filter").value;
    var filterList = makeupData.filter(function (elem){
        return elem.product==selected;
    })
    displayData(filterList);
    document.querySelector("#displayitem").textContent=`Makeup - ${filterList.length} items`
}

function handlerPriceSort(){
    var selected = document.querySelector("#priceSort").value;
    if(selected=="high"){
        makeupData.sort(function (a,b){
            return b.price-a.price;
        })
    }
    if(selected=="low"){
        makeupData.sort(function (a,b){
            return a.price-b.price
        })
    }
    if(selected=="rel"){
        makeupData.sort(function (a,b){
            return b.rating-a.rating;
        })
    }
    displayData(makeupData)
}
document.querySelector("#displayitem").textContent=`Makeup - ${makeupData.length} items`

function displayData(makeupData){
document.querySelector("#container-prod").innerHTML = ""
makeupData.map(function (elem){

    

    var div = document.createElement("div");
    div.setAttribute("id","main")
    
    var div3 = document.createElement("div")
    div3.setAttribute("id","shadeFlex")

    var shadeNo = document.createElement("p");
    shadeNo.textContent = elem.shade_no;
    shadeNo.setAttribute("id","shadeNo")
    
    var shadeImg=document.createElement("img");
    shadeImg.setAttribute("src",elem.shade_url);
    shadeImg.setAttribute("id","shade")

    var img = document.createElement("img");
    img.setAttribute("src", elem.image_url);
    img.setAttribute("id","image")

    var head = document.createElement("p");
    head.textContent = elem.name;

    var p = document.createElement("p");
    p.textContent = `Rs. ${elem.price} `
     
    var div1 = document.createElement("div");
    div1.setAttribute("id","flex")

    var img1 = document.createElement("img");
    img1.setAttribute("src", elem.star_url);
    img1.setAttribute("id","star")

    var p1 = document.createElement("p");
    p1.textContent = elem.rating;

    var p2 = document.createElement("p");
    p2.textContent = elem. reviews;

    var div2 = document.createElement("div");
    div2.setAttribute("id","flex1");

    var btn = document.createElement("button");
    btn.setAttribute("id","btn")
    btn.innerHTML = "&#129293";
    btn.addEventListener("click",function(){
        wishList(elem)
    })

    var btn1 = document.createElement("button");
    btn1.textContent = "Add to cart";
    btn1.addEventListener("click",function(){
        addToCart(elem)
    })
    btn1.setAttribute("id","btn1")
    div3.append(shadeNo,shadeImg)
    div2.append(btn,btn1)
    div1.append(img1,p1,p2)
    div.append(div3,img,head,p,div1,div2);
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
    wishlistArr.push(elem)
    localStorage.setItem("listItems", JSON.stringify(wishlistArr));
    alert("Item added to wish list")
}