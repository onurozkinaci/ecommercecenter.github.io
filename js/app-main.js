//=> Main Page Transactions;
let productGroups = 
    {
       firstGroupProducts: [
            {
                imgSource : "https://cdn.dsmcdn.com/mnresize/1200/1800/ty513/product/media/images/20220822/12/163815658/469101315/1/1_org_zoom.jpg",
                title : "Ostwint Mavi Stone Matte Saç Şekillendirici",
                price : "26,90 TL"
            },
            {
                imgSource : "https://cdn.dsmcdn.com/mnresize/1200/1800/ty403/product/media/images/20220420/11/95140150/4073342/1/1_org_zoom.jpg",
                title : "David Beckham The Essence Erkek Edt 75 ml",
                price : "94,50 TL"
            },
            {
                imgSource : "https://cdn.dsmcdn.com/mnresize/1200/1800/ty2/product/media/images/20200423/9/128008/12905671/2/2_org_zoom.jpg",
                title : 'Sandisk Plus 240GB 530MB-440MB/s Sata 3 2.5" SSD',
                price : "477 TL"
            },
            {
                imgSource : "https://cdn.dsmcdn.com/mnresize/1200/1800/ty3/product/media/images/20200521/18/1587144/71621003/1/1_org_zoom.jpg",
                title : "Liggo Erkek Çocuk Sarı Reflex Kaleci Eldiveni",
                price : "99,90 TL"
            },
            {
                imgSource : "https://cdn.dsmcdn.com/mnresize/1200/1800/ty133/product/media/images/20210621/14/102691439/191144065/1/1_org_zoom.jpg",
                title : "Axe Ice Chill Edt 50 Ml + Deodorant 150 Ml Seti",
                price : "117,80 TL" 
            }
       ],
       secondGroupProducts: [
       {
       imgSource : "https://cdn.dsmcdn.com/mnresize/1200/1800/ty327/product/media/images/20220209/11/47398584/383547354/1/1_org_zoom.jpg",
       title : "adidas Ice Dive Edt 75 Ml Erkek Vücut Spreyi",
       price : "31,90 TL"
       },
       {
       imgSource : "https://cdn.dsmcdn.com/mnresize/1200/1800/ty428/product/media/images/20220510/21/109253913/13354918/1/1_org_zoom.jpg",
       title : "TRYON Kıdz-20.082 Kidz Çocuk Kaleci Eldiveni",
       price : "115,43 TL"
       },
       {
       imgSource : "https://cdn.dsmcdn.com/mnresize/1200/1800/ty324/product/media/images/20220208/12/46834639/382090100/1/1_org_zoom.jpg",
       title : "Polo55 Life Aphrodisiac Edp 60 ml Erkek Parfüm",
       price : "79,90 TL"
       },
       {
       imgSource : "https://cdn.dsmcdn.com/mnresize/1200/1800/ty385/product/media/images/20220406/16/84599574/14833789/1/1_org_zoom.jpg",
       title : "Wella Erkek Köpük Saç Boyası Siyah 60ml",
       price : "208,90 TL"
       },
       {
          imgSource : "https://cdn.dsmcdn.com/mnresize/1200/1800/ty464/product/media/images/20220627/19/130830886/152834534/1/1_org_zoom.jpg",
          title : "Sekizbiraltı Joker Sırt Baskılı Siyah Oversize Unisex Tshirt",
          price : "59,91 TL" 
       }
      ],
      thirdGroupProducts : [
          {
             imgSource : "https://cdn.dsmcdn.com/mnresize/1200/1800/ty472/product/media/images/20220708/13/137090799/491863838/1/1_org_zoom.jpg",
             title : "Jack & Jones Bisiklet Yaka Logo Baskili Erkek Tisört",
             price : "139,99 TL"
          },
          {
             imgSource : "https://cdn.dsmcdn.com/mnresize/1200/1800/ty123/product/media/images/20210603/1/95225771/57074174/1/1_org_zoom.jpg",
             title : "Moser Wahl 5537-3016 GroomsMan Erkek Bakım Kiti",
             price : "174,50 TL"
          },
          {
             imgSource : "https://cdn.dsmcdn.com/mnresize/1200/1800/ty425/product/media/images/20220509/14/107581696/122626004/3/3_org_zoom.jpg",
             title : "Torima P68 Bluetooth Kablosuz Kulaklık",
             price : "133,51 TL"
          },
          {
             imgSource : "https://cdn.dsmcdn.com/mnresize/1200/1800/ty452/product/media/images/20220609/19/123505501/497414030/1/1_org_zoom.jpg",
             title : "TECHNOMEN T500 Akıllı Saat Türkçe Menülü",
             price : "249,90 TL"
          },
          {
             imgSource : "https://cdn.dsmcdn.com/mnresize/1200/1800/ty501/product/media/images/20220809/14/156579095/423420515/1/1_org_zoom.jpg",
             title : "Ithink 30000 Mah Taşınabilir Powerbank",
             price : "257,90 TL" 
          }
      ]
    };

//If productGroups.firstGroupProducts is not filled at first, this function is used to fill the first group of products object in the 
//productGroups array;
/*fillTheFirstGroup();
function fillTheFirstGroup(){
  let firstGroupDOM = document.getElementsByClassName("first-group");
  let newObject;
    for(let i=0; i<firstGroupDOM.length; i++){
        let content = firstGroupDOM[i].innerHTML.split("\n"); //the content of a div is splitted to get the 
         //different elements of this div and they spliited by \n's.
        //console.log(content)
        //console.log(content[5])  
        let imgSrc = content[1].slice(content[1].indexOf("src="),content[1].indexOf("alt")); //content of src will be taken
        imgSrc = imgSrc.trim().slice(imgSrc.indexOf("=")+1); //trim() ile string'in sonunda kalan bosuk da silinir.
        imgSrc = imgSrc.trim().slice(imgSrc.indexOf('"')+1);
        let boldTitle = content[3].slice(content[3].indexOf("<strong>"),content[3].indexOf("</strong>"));
        boldTitle = boldTitle.trim().slice(boldTitle.indexOf(">")+1);
        let remainTitle = content[3].slice(content[3].indexOf("</strong>"),content[3].indexOf("</p>"));
        remainTitle = remainTitle.trim().slice(remainTitle.indexOf(">")+1)
        //console.log(remainTitle);
        let productTitle = boldTitle+remainTitle;
        //console.log(productTitle);
        let productPrice = content[5].slice(content[5].indexOf("pt-0"),content[5].indexOf("</p>"));
        productPrice = productPrice.trim().slice(productPrice.indexOf(">")+1);
        //console.log(productPrice.length);
           
        newObject = {
            imgSource: imgSrc,
            title: productTitle,
            price: productPrice
        }
        console.log(newObject);
        productGroups.firstGroupProducts.push(newObject);
    }
    console.log(productGroups.firstGroupProducts);
}
*/
//------------------------------------------------------

//For the forward button's movement;
 let nextButton = document.querySelector("#btn-next");
 let nextButtonBelow = document.querySelector("#btn-next-below");
 nextButton.addEventListener('click',moveForward);
 nextButtonBelow.addEventListener('click',moveForward);
 //For the previous button's movement;
 let previousButton = document.querySelector("#btn-prev");
 let previousButtonBelow = document.querySelector("#btn-prev-below");
 previousButton.addEventListener('click',moveBack);
 previousButtonBelow.addEventListener('click',moveBack);

 function moveForward(event){
   /*To get the last product in a product row group => "event.target.previousSibling.previousSibling.firstChild.nextSibling" 
   //will be used;
   //console.log(event.target.previousSibling.previousSibling.firstChild.nextSibling);*/
   //console.log(event.target);
   //console.log(event.target.parentElement.id);
   let parentBoxId = event.target.parentElement.id;
   console.log(parentBoxId);
   let cardDOM = event.target.previousSibling.previousSibling.firstChild.nextSibling; 
   cardDOM = cardDOM?cardDOM:event.target.previousSibling.previousSibling.firstChild;
   //console.log(event.target.previousSibling.previousSibling.firstChild)
   //if current shown items are in the first-group according to the taken class-name info of the last cart item before the next(forward) button.
   //The second product group will be shown when the user clicks on a next button then;

    if(cardDOM.classList.contains("first-group")){
        createProducts('second-group',parentBoxId); 
        //console.log(cardDOM.classList);  
    } 
    else if(cardDOM.classList.contains("second-group")){
        createProducts('third-group',parentBoxId); 
        //console.log(cardDOM.classList+"...");
    }    
 }

 //It will be triggered when the preivous/back button is clicked;
 function moveBack(event){
    let parentBoxId = event.target.parentElement.id;
    console.log(parentBoxId);
    //To get the first product in a product row group;
    let cardDOM =  event.target.nextSibling.nextSibling.firstChild.nextSibling;
    //console.log(cardDOM);
    //To control the location of DOM elements after the product group class is changed;
    cardDOM = cardDOM?cardDOM:event.target.nextSibling.firstChild;
    //console.log(cardDOM);
    //If current shown items are in the second-group according to the taken class-name info of the first cart item after the previous button.
    //The first product group will be shown when the user clicks on a back/previous button then;
     if(cardDOM.classList.contains("second-group")){
        createProducts('first-group',parentBoxId); 
         //console.log(cardDOM.classList);  
     } 
     else if(cardDOM.classList.contains("third-group")){
        createProducts('second-group',parentBoxId); 
         //console.log(cardDOM.classList+"...");
     }    
  }


 //To create the product groups when user clicks on next button on the product-cards area on the Main Page(index.html);
 function createProducts(pGroup,pBoxId){
    // let productBoxDOM = document.querySelector("#middle-product-box");
    //middle-product-box veya below-product-box gonderiliyor tiklanan elemanin parent'ina gore moveForward() fonksiyonundan;
    let productBoxDOM = document.querySelector(`#${pBoxId}`);
    productBoxDOM.innerHTML = "";
    let btnPrevDOM = document.createElement("button");
    btnPrevDOM.classList.add("btn","btn-outline-success");
    btnPrevDOM.id = pBoxId === "middle-product-box"? "btn-prev":"btn-prev-below";
    // btnPrevDOM.addEventListener('click',function(){
    //     console.log("deneme1234");
    // });
    btnPrevDOM.addEventListener('click',moveBack);
    productBoxDOM.appendChild(btnPrevDOM);

    let productGroup;
    if(pGroup === "first-group")
        productGroup = "firstGroupProducts";
    else if(pGroup === "second-group")
        productGroup = "secondGroupProducts";
    else if(pGroup === "third-group")
        productGroup = "thirdGroupProducts";
    
    
    productGroups[`${productGroup}`].forEach(item => {
        let divOuter = document.createElement("div");
        divOuter.classList.add("col-sm");
        let divInner = document.createElement("div");
        divInner.classList.add("product-card",`${pGroup}`,"text-center");
        let productImage = document.createElement("img");
        productImage.src= `${item.imgSource}`;
        productImage.alt = "product-image";
        productImage.style.width = "60%";
        productImage.style.height = "120px";
        productImage.classList.add("box-product"); //to give style features for the product in the product-box
        let divProduct = document.createElement("div");
        divProduct.classList.add("product-body");
        let productText = document.createElement("p");
        productText.innerHTML = `<strong>${item.title.slice(0,item.title.indexOf(""))}</strong> 
            ${item.title.slice("")}`;
        let spanDOM = document.createElement("span");
        spanDOM.classList.add("hstack");
        let priceInfo = document.createElement("p");
        priceInfo.classList.add("card-price","pt-0");
        priceInfo.innerText = `${item.price}`;
        let buyButton = document.createElement("button");
        buyButton.classList.add("btn","btn-outline-success","btn-add");
        buyButton.type = "submit";
        buyButton.addEventListener("click",addToBag); //addToBag function was defined at app.js file
        buyButton.innerText = "Sepete Ekle";

        spanDOM.appendChild(priceInfo);
        spanDOM.appendChild(buyButton);
        divProduct.appendChild(productText);
        divProduct.appendChild(spanDOM);
        divInner.appendChild(productImage);
        divInner.appendChild(divProduct);
        divOuter.appendChild(divInner);
        productBoxDOM.appendChild(divOuter);
    });
    let btnNextDOM = document.createElement("button");
    btnNextDOM.classList.add("btn","btn-outline-success");
    btnNextDOM.id = pBoxId === "middle-product-box"? "btn-next":"btn-next-below";
    btnNextDOM.addEventListener('click',moveForward);
    productBoxDOM.appendChild(btnNextDOM);
 }

