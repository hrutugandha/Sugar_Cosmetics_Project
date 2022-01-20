
    
    //Start
    
    //Local Stogare Key: makeupData
    var cartArr = JSON.parse(localStorage.getItem("makeupData"))||[];
    console.log("Cart: ",cartArr);
     displayCart(cartArr);

//     window.addEventListener("load", function () {
//         displayCart(cartArr);
//   });

    function displayCart(cartArr){
        document.querySelector(".cart-product").innerHTML="";
        cartArr.map(function (data,index){
        var div = document.createElement("div");
        
        //Image Creation
        var image = document.createElement("img");
        image.setAttribute ("src",data.image_url)

        //Name Creation
        var name = document.createElement("p");
        name.textContent = data.name;

        //Image & Name in one div;
        var divImgName = document.createElement("div");
        divImgName.append(image,name)

        //Price Creation

        var price = document.createElement("p");
        price.textContent = data.price;
        

        //Increment/Decrement Added Product Creation
        var divBox = document.createElement("div");
        divBox.id = "divBox"
        var divRmv = document.createElement("div");
        divRmv.id="divRmv";
        divRmv.innerHTML='<i class="fas fa-trash"></i>';
        var divDec = document.createElement("div");
        divDec.id="divDec";
        divDec.innerHTML='<i class="fas fa-minus-circle"></i>'
        var divQty = document.createElement("div");
        divQty.id="divQty";
        divQty.textContent= data.count;
        var divInc = document.createElement("div");
        divInc.id="divInc";
        divInc.innerHTML='<i class="fas fa-plus-circle"></i>'

        var divPriceBox = document.createElement("div");
        divPriceBox.id="divPriceBox";
    
        //Append to divBox
        divBox.append(divRmv,divDec,divQty,divInc,divPriceBox);
        
        var divQtyP = document.createElement("div");
        divQtyP.id ="divQtyP";
        divQtyP.textContent=data.count;

        var divMul = document.createElement("div");
        divMul.id ="divMul";
        divMul.textContent="x";

        var divPrice = document.createElement("div");
        divPrice.id ="divPrice";
        divPrice.textContent=data.price;

        var divEqual = document.createElement("div");
        divEqual.id ="=";
        divEqual.textContent="=";

        var divPTotal = document.createElement("div");
        divPTotal.id ="divPTotal";
        divPTotal.textContent = data.price * data.count;

        //Append to divPriceBox
        divPriceBox.append(divQtyP,divMul,divPrice,divEqual,divPTotal)
       

        //Append to div
        div.append(divImgName,divBox);
        document.querySelector(".cart-product").append(div);

        
        //Remove Creation
        // var remove = document.createElement("p");
        // remove.textContent = "Remove"
        divRmv.addEventListener("click",function(){
            removeItem(index);
        });

        //Increment function Call 
        divInc.addEventListener("click",function(){
            incrementProduct(index);
        });

        //Decreement function Call 
        divDec.addEventListener("click",function(){
            decrementProduct(index);
        });
    });
}

    
     //Total calculate
     var total = cartArr.reduce(function(acc,cv){
        return (acc + cv.price*cv.count);
    },0);
    localStorage.setItem("total",total);

    console.log("Total: ",total);

    document.querySelector(".smry-cart-total").textContent=`Cart Total : ${total} `
    
    //Coupon Apply
    document.querySelector("#cart-total").textContent=total;
    localStorage.setItem("discountPrice",0);

    var discPrice = JSON.parse(localStorage.getItem("discountPrice"));

    //Check didcount =0
    if(discPrice==0){
        document.querySelector("#disc-applied").textContent=0;
        document.querySelector("#pay-amount").textContent=total;
    }

    document.querySelector("form").addEventListener("submit", discount);
     //Apply Discount
     function discount(event){
        event.preventDefault(); 
        var coupon = document.querySelector("#coupon").value;
        if(coupon=='masai30'){
            var discountPrice = total * 0.7;

            localStorage.setItem("discountPrice",discountPrice);
            document.querySelector("#disc-applied").textContent=total*0.3;
            document.querySelector("#pay-amount").textContent=discountPrice;

            console.log("discount:",discountPrice);
        }
        else{
            document.querySelector("#invalid-coupon").textContent="Invalid Coupon";
        }
        
       
    }

   

    //Redirect to payment page
    document.getElementById("checkOut").addEventListener("click",checkOut);
    function checkOut(event){
        total = JSON.parse(localStorage.getItem("total"));
        // window.location.href = "payment.html"
        if(total!=0){
            window.location.href = "payment.html"
        }
        else{
            alert("Cart Empty");
        }
        
    }
   


 //Remove From Cart
 function removeItem(index){
    event.preventDefault();
         console.log(index);

         total = JSON.parse(localStorage.getItem("total"));
         var newTotal=total-cartArr[index].price;
         localStorage.setItem("total",newTotal);
        
         //NEED CHANGE LATER
         //When item is removed from cart then Discount Applied vis changed
         var disRemove = total*.3 - cartArr[index].price * 0.3;
         console.log("dis ",disRemove);
         document.querySelector("#disc-applied").textContent=disRemove;
        

         cartArr.splice(index,1);
        // console.log(cartArr);
         localStorage.setItem("makeupData",JSON.stringify(cartArr));
        //  var cartArrRemove = JSON.parse(localStorage.getItem("makeupData"));
         console.log(cartArr)
         displayCart(cartArr);
         
         console.log(newTotal);
         
         document.querySelector("#total").textContent=`Cart Total : ${newTotal} `
         document.querySelector("#cart-total").textContent=newTotal;
         document.querySelector("#pay-amount").textContent=newTotal;
         //console.log("Aftet Rem Total: ",newTotal);
         
        //  cartArr.map(function (data,index){
        //      document.querySelector("")
        //  })
     }

     //Increment Product
     function incrementProduct(index){
        event.preventDefault();

        var newCount= ++cartArr[index].count;
        console.log(newCount)
        localStorage.setItem("makeupData",JSON.stringify(cartArr));

        //Update Quantiity when incremented
        var x = document.querySelectorAll("#divQty");
        x[index].textContent=newCount;

       //Update Quantiity to on when incremented(On divPriceBox)
        var y = document.querySelectorAll("#divQtyP");
        y[index].textContent=newCount;

        //Uodate Total Price when increment Product
        var z = document.querySelectorAll("#divPTotal");
        z[index].textContent = cartArr[index].price * cartArr[index].count

        //Update Card Total
        total +=  cartArr[index].price;
        console.log("Total after inc. ",total)
        localStorage.setItem("total",total);
        document.querySelector("#total").textContent=`Cart Total : ${total} `;
        document.querySelector("#cart-total").textContent=total;
        document.querySelector("#pay-amount").textContent=total;
        

     }
     
     //Decrement Product
     function decrementProduct(index){
        event.preventDefault();
        count=cartArr[index].count;
        if(count==1){
            removeItem(index);
        }
        else{
            var newCount=--cartArr[index].count;
            localStorage.setItem("makeupData",JSON.stringify(cartArr));

             //Update Quantiity when incremented
            var x = document.querySelectorAll("#divQty");
            x[index].textContent=newCount;
            console.log(newCount)

            //Update Quantiity to on when Decrement(On divPriceBox)
            var y = document.querySelectorAll("#divQtyP");
            y[index].textContent=newCount;

    
            //Uodate Total Price when Decrement Product
            var z = document.querySelectorAll("#divPTotal");
            z[index].textContent = cartArr[index].price * cartArr[index].count
            //Update Card Total
            total -=  cartArr[index].price;
            console.log("Total after dec. ",total)
            localStorage.setItem("total",total);
            document.querySelector("#total").textContent=`Cart Total : ${total} `;
            document.querySelector("#cart-total").textContent=total;
            document.querySelector("#pay-amount").textContent=total;
        
        }
        
     }
    
