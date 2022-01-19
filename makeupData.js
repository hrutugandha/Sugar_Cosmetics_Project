var makeupData = JSON.parse(localStorage.getItem("makeupData"));
var cartArr = JSON.parse(localStorage.getItem("cartItems")) || [];
var wishlistArr = JSON.parse(localStorage.getItem("listItems")) || []

displayData(makeupData);

function filter(){
    var selected = document.querySelector("#filter").value;
    var filterList = makeupData.filter(function (elem){
        return elem.product==selected;
    })
    displayData(filterList)
}

function handlerPriceSort(){
    var selected = document.querySelector("#priceSort").value;
    // console.log(selected);
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