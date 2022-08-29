
//For the buttons which will add the item to shopping bag;
let buttons = document.getElementsByClassName("btn-add");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", addToBag);
}

let addedProducts = []; //Array()
getProductsFromStorage();
function getProductsFromStorage(){
    //addedProducts array will be filled with the taken values from local storage;
    if(JSON.parse(localStorage.getItem("addedProducts")) && JSON.parse(localStorage.getItem("addedProducts")).length > 0){
       addedProducts = JSON.parse(localStorage.getItem("addedProducts"));
       //console.log(addedProducts);
       let ulDOM = document.querySelector("#productList");
       addedProducts.forEach(function(item){
          let divDOM = document.createElement("div");
          divDOM.classList.add("liDiv","border-bottom","border-dark");
          let liDOM = document.createElement("li");
          liDOM.classList.add("d-flex");
          let imgDOM = document.createElement("img");
          imgDOM.src = item.imgSrc;
          imgDOM.alt = "product-image";
          imgDOM.classList.add("pimage-bag"); //to give the functionality when the user hover on the image of product in the shopping-bag
          imgDOM.addEventListener("click",showTheImage)
          let titleDOM = document.createElement("p");
          titleDOM.innerText = item.name;
          let inputDOM = document.createElement("input");
          inputDOM.type="number";
          inputDOM.min = "1";
          inputDOM.max = "9";
          inputDOM.name = "orderCount";
          //inputDOM.placeholder = "Enter the count...";
          inputDOM.value = item.totalCount;
          inputDOM.addEventListener("change",changePrice)
          let priceDOM = document.createElement("p");
          priceDOM.innerText = `${(parseFloat(calculatePrice(item.productPrice)) * parseInt(item.totalCount)).toFixed(2)} TL`;
          console.log(calculatePrice(item.productPrice), parseInt(item.totalCount))
          priceDOM.style.paddingLeft = "50px";
          let spanDOM = document.createElement("span");
          spanDOM.classList.add("trash-icon","ms-auto");
          let trashButton = document.createElement("button");
          trashButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>`;
           trashButton.addEventListener('click',removeFromBag);
           spanDOM.appendChild(trashButton);
           liDOM.appendChild(imgDOM);
           liDOM.appendChild(titleDOM);
           liDOM.appendChild(inputDOM);
           liDOM.appendChild(priceDOM);
           liDOM.appendChild(spanDOM);
           divDOM.appendChild(liDOM);
           ulDOM.appendChild(divDOM);
           //Sepetim sayfasindaki footer'in sepette 7'den az urun olmasi halinde asagi sabitlenmesi saglandi;
           //removeFromTheBag() metoduna da aynisi verildi, silinme islemi sonrasi direkt eleman sayisinin 7'nin altina dustugunun
           //algilanmasi icin;
           if(JSON.parse(localStorage.getItem("addedProducts")).length <7){
            let navDOM = document.querySelector("#nav-footer");
            navDOM.classList.add("fixed-bottom");
           }
       }); 
       calculateTotal();    

       //$('.success').toast('show');
       
    } else{
        //console.log("Sepetinizde urun bulunmamaktadir!");
        createWarningDiv();
        let navDOM = document.querySelector("#nav-footer");
        navDOM.classList.add("fixed-bottom");
     }
}

//Showing the image on the center when the user clicks on image;
function showTheImage(event){
   //=>To set the defined image object of modal in the shopping-bag.html file;
   let shownImage = document.querySelector("#shown-image");
   shownImage.src = event.target.src;
   shownImage.style.width = "100%";
   shownImage.style.height = "100%";
   //shownImage.style.border = "1px solid black"
   //=>To show the modal as a pop-up after the image is clicked and also it makes the background blurred;
   const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
   myModal.show();
}


//--------------------------
/*=>To calculate the price in an appropriate format
//for the multiplication of totalCount and fetched 
//productPrice(unit price of a product) values which 
//will be multiplied to calculate last calculate price 
//of the product according to the stored user's count of product
//selection which is kept as 'totalCount' in the local storage.
//=>The calculation can be seen above in "priceDOM.innerText = `${calculatePrice(item.productPrice) * parseInt(item.totalCount)} TL`;";
*/
function calculatePrice(price) {
   price = price.replace(",","."); 
   price = price.replace(" TL","");
   //console.log(price);
   if(price.slice(price.indexOf(".")).length >=4){ //1.000 itibariyle buraya girmis olur sayilar
      price = price.replace(".","");
   }
   return price;
}
//------------------------------

//Sepette urun kalmayinca(silinip) veya en bastan sepette hic urun yoksa,
//(localStorage'dan cekilen degere gore) uyari vermek adina bu fonksiyon tanimlandi;
function createWarningDiv() {
   let ulDOM = document.querySelector("#productList");
   let divDOM = document.createElement("div");
   divDOM.classList.add("liDiv","border-bottom","border-dark");
   let liDOM = document.createElement("li");
   liDOM.innerHTML = `
        <span class="d-flex p-4">
            <h5>Sepetinizde Ürün Bulunmamaktadır!</h5>
            <a href = "index.html" class="ms-auto">
               <button class="btn btn-dark">Ürünleri İncele</button>
            </a>
        </span>
   `
   divDOM.appendChild(liDOM);
   ulDOM.appendChild(divDOM);
}

function addToBag(event) {
   let flag = false; //to check whether an item is already exists in the shopping-bag
   let selectedButton = event.target;
   let price = selectedButton.previousSibling.previousSibling;
   //sonradan eklenen elemanlar icin yalnizca bir adim geri gitmek yeterli oluyor(index.html'deki pagination/slider kismi gibi);
   price = price?price:selectedButton.previousSibling; 
   let productText = price.parentElement.previousSibling.previousSibling;
   //sonradan eklenen elemanlar icin yalnizca bir adim geri gitmek yeterli oluyor(index.html'deki pagination/slider kismi gibi);
   productText = productText?productText:price.parentElement.previousSibling;
   console.log(price.innerText,productText.innerText,productText.parentElement.previousSibling);
   let imgSource = productText.parentElement.previousSibling.previousSibling;
   //sonradan eklenen elemanlar icin yalnizca bir adim geri gitmek yeterli oluyor(index.html'deki pagination/slider kismi gibi);
   imgSource = imgSource?imgSource:productText.parentElement.previousSibling;
   console.log(selectedButton,price,productText,imgSource)
   let product = {
     imgSrc: imgSource.src,
     name: productText.innerText,
     productPrice:price.innerText,
     totalCount: 1 //it will be assigned as 1 when the product is assigned at first
     //and will be increased later if the user increases it's count in the shopping-bag.
   }

   if(JSON.parse(localStorage.getItem("addedProducts"))){
      addedProducts = JSON.parse(localStorage.getItem("addedProducts"));
      addedProducts.forEach(function(item){
         if(item.name === productText.innerText){
         alert("Sepete önceden eklediğiniz ürün tekrar eklenemez!")
         flag=true;
         }
      });
   }

   if(flag === true) //the product added to shopping bag already;
   {
      //giving toast error message when the product cannot be added to shopping-bag;
      const toastTrigger = document.getElementById('error');
      const toastError = new bootstrap.Toast(toastTrigger);
      toastError.show();
      return; //to exit from function;
   }
   else{
      addedProducts.push(product);
      localStorage.setItem('addedProducts',JSON.stringify(addedProducts));
      // $('#toast-success').toast('show');
      //giving toast success message when the product is added to shopping-bag successfully;
      const toastTrigger = document.getElementById('success');
      const toastSuccess = new bootstrap.Toast(toastTrigger);
      toastSuccess.show();
   }

   // $.ajax({
   //    url: 'http://example.com/refresh.php',
   //    success: function(data) {
   //        $('#shopping-box').html(data).delay(2000);
   //    }
   //  });
   //calculateTotal(); 
}

//Removing the items from the shooping bag;
function removeFromBag(event) {
    let selectedItem = event.target;
    //console.log(selectedItem.tagName.toLowerCase());
    //Selected item is taken as a button with these conditions;
    if(selectedItem.tagName.toLowerCase() === "path")
      selectedItem = selectedItem.parentElement.parentElement;       
    else if(selectedItem.tagName.toLowerCase() === "svg")
      selectedItem = selectedItem.parentElement;
    
    let deletedItem = selectedItem.parentElement.parentElement.parentElement;
    //The element will be deleted from the array and local storage by givin the index of
    //below variable's("productNameItem") index;
    let productNameItem = selectedItem.parentElement.previousSibling.previousSibling.previousSibling;
    //console.log(productNameItem.innerText);
    deletedItem.remove();
    //The current elements in a local storage will be transferred into the array
    //before deleting the selected item to prevent complicated deleting situations;
    addedProducts = JSON.parse(localStorage.getItem("addedProducts"));

    //To find the selected item in the array;
    let index;
    for(let i=0; i<addedProducts.length;i++){
       if(addedProducts[i].name === productNameItem.innerText){
          index = i;
          break;
       }
    }
    console.log(index);
    addedProducts.splice(index,1); //the element will be deleted from the array
    localStorage.setItem('addedProducts',JSON.stringify(addedProducts)); //the element will be deleted from the local storage
    //by updating it with the new(updated) array.*/
    //Sepetim sayfasindaki footer'in sepette 7'den az urun olmasi halinde asagi sabitlenmesi saglandi;
    if(JSON.parse(localStorage.getItem("addedProducts")).length <7){
      if(JSON.parse(localStorage.getItem("addedProducts")).length === 0){
         createWarningDiv(); 
         //**To update the total price when there is no item remain after deleting all
         //of the list items;
         let totalPrice = document.querySelector("#total-price");
         totalPrice.innerText = "0 TL";
       }
      let navDOM = document.querySelector("#nav-footer");
      navDOM.classList.add("fixed-bottom");
    }
    calculateTotal();
}

function changePrice(event) {
   let count = parseInt(event.target.value);
   let productName = event.target.previousSibling;
   let priceItem = event.target.nextSibling;
   //load the array with the fetched datas from local storage;
   addedProducts = JSON.parse(localStorage.getItem("addedProducts"));
   let unitPrice;
   let updatedPrice;
   for(let i=0; i<addedProducts.length;i++){
     if(addedProducts[i].name === productName.innerText){
        unitPrice = addedProducts[i].productPrice;
        //<To change the product's count with the selected count> both on array and local storage;
        addedProducts[i].totalCount = count;
        localStorage.setItem('addedProducts',JSON.stringify(addedProducts));
        //</To change the product's count with the selected count>
        break;
     }
   }

//    //16.582,59 TL
//    //Buraya dahil olmamasi adina 999,99 sonrasi ihtimali dusunerek length>=7 verildi;
//    if(unitPrice.slice(0,unitPrice.indexOf(" ")).length >=7 
//       && unitPrice.includes(",")){
//       //console.log(unitPrice);
//       let noAfterComma = unitPrice.slice(unitPrice.indexOf(",")+1,unitPrice.indexOf(" ")); //virgul sonrasindaki sayiyi TL oncesindeki bosluga kadar alir/keser.
//       let basePrice = unitPrice.slice(0,unitPrice.indexOf(",")); //number before comma
//       noAfterComma = "0,"+noAfterComma;
//       basePrice = parseFloat(basePrice) * count;
//       noAfterComma = parseFloat(noAfterComma.replace(",",".")) * count;
      
//       updatedPrice = basePrice + noAfterComma;
//       console.log(updatedPrice);
//    }else{ //54,99 TL, 14.174 TL vb.
//       unitPrice = unitPrice.replace(",",".");
//       updatedPrice = (parseFloat(unitPrice))* count;
//       //console.log(updatedPrice);
//    }
//    //console.log(parseFloat(unitPrice)*2);
//    //priceItem.innerText = (Number(priceItem.innerText) * count).toString();
//    //unitPrice = unitPrice.replace("TL","");

//Asagida birim fiyata(unitPrice) gore .(decimal point) sonrasinda 3 tane veya daha fazla sayi varsa(. ile birlikte 4 sayi)
//decimal point sonrasinda toFixed(3) ile 3 hane al, birim fiyat bundan farkli ise 2 hane al seklinde belirtildi.
unitPrice = unitPrice.replace(",","."); 
unitPrice = unitPrice.replace(" TL","");
//console.log(unitPrice);

if(unitPrice.slice(unitPrice.indexOf(".")).length >=4){ //1.000 itibariyle buraya girmis olur sayilar
   unitPrice = unitPrice.replace(".","");
}
  updatedPrice = (parseFloat(unitPrice)* count).toFixed(2);
  console.log(updatedPrice);
  event.target.nextSibling.innerText = `${updatedPrice} TL`;
  calculateTotal(); //to change the total price after changing the count of a specific product
 
  //giving toast success message when the items count is changed;
  const toastTrigger = document.getElementById('success-update');
  const toastSuccess = new bootstrap.Toast(toastTrigger);
  toastSuccess.show();
}

//Calculating the total price of products in the shopping bag;
function calculateTotal() {
   let products = document.getElementsByClassName("liDiv");
   let total = 0;
   //console.log(products.length);
   for(let i =0; i<products.length; i++){
      //console.log(products[i].firstChild.childNodes[3].innerText); //price of list elements
      let price = products[i].firstChild.childNodes[3].innerText.replace(",",".");
      price = price.replace(" TL","");
      if(price.slice(price.indexOf(".")).length >=4) //. ile beraber decimal point sonrasinda en az 3 eleman varsa(ornegin 14.458,40, 14158 olarak alinacak 
      //ve dogru hesaplanma(kurus dahil) saglanacak)
         price = price.replace(".","")
      //console.log(parseFloat(price))
      total += parseFloat(price);
   }
   total = Math.round(total*100)/100; //decimal point sonrasi iki basamak bulunmasi icin
   console.log(total);
   let totalPrice = document.querySelector("#total-price");
   totalPrice.innerText = `${total} TL`;
}

//Siparis verilmesi halinde(Sepetim sayfasinda Siparis Olustur butonuna tiklanip);
let btnOrderDOM = document.querySelector("#btn-order");
btnOrderDOM.addEventListener('click',orderProducts);

function orderProducts(event) {
  //console.log(event.target.previousSibling.previousSibling)
  let totalPrice = event.target.previousSibling.previousSibling.innerText;
  if(parseFloat(totalPrice) > 0){
     alert("Your order is placed!");
     //giving toast success message when the product is added to shopping-bag successfully;
     const toastTrigger = document.getElementById('success');
     const toastSuccess = new bootstrap.Toast(toastTrigger);
     toastSuccess.show();
  }
  else //totalPrice = 0,cannot be negative because of the max value limitation of count input 
  //for the products on the shopping bag;
  {
    alert("Total price is zero, add a product to order!");
    //giving toast error message when the product cannot be added to shopping-bag;
    const toastTrigger = document.getElementById('error');
    const toastSuccess = new bootstrap.Toast(toastTrigger);
    toastSuccess.show();
    return; //to exit from function;
  }
  
  //??siparis bilgilerini alip detaylandirabilirsin, siparislerim sayfasini olusturman halinde
}






















