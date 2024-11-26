let shop = document.getElementById('shopItem')
console.log(shop)

let basket =JSON.parse(localStorage.getItem('data')) || [];



let shopItemCart = () => {
    return(
        shop.innerHTML= myShopProduct.map((tunde) => {
            console.log(tunde)
            let {id, name, img, price, desc} = tunde

            let search = basket.find((x) => x.id == id) || [];
            return(
                    `
          <div id=product-item-${id} class="item">
                <img src=${img} alt="">
                <div class="itemname">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                </div>
                <div class="itemprice">
                    <h3>&#x20A6;${price}</h3>
                  <div>
                    <span onclick='myincrease(${id})'>+</span>
                    <span id=${id}>${search.item === undefined ? 0 : search.item}</span>
                    <span onclick="mydecrease(${id})">-</span>
                  </div>
                </div>
                
        
            </div>
        
        `
            )
        }).join('') 
    )
}
shopItemCart()



let myincrease = (id) => {
    
    let selected = id
    let search = basket.find((x) => x.id == selected.id);
    if (search === undefined){
        basket.push({
            id: selected.id,
            item: 1
        })
    }else{
        search.item +=1 
    }

   
    console.log(basket);
    updateItem(selected.id)
    localStorage.setItem('data', JSON.stringify(basket))
}
let mydecrease = (id) => {
    let selected = id
    let search = basket.find((x) => x.id == selected.id);
    if (search === undefined) return 
    else if (search.item == 0) return;
    else{
        search.item -=1 
    }
   
    console.log(basket);
   
    updateItem(selected.id); 
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem('data', JSON.stringify(basket));
    
}

let updateItem = (id) => {
    let search = basket.find((x) => x.id == id);
    console.log(search.item)
    document.getElementById(id).innerHTML=search.item
    calculate();
};

let calculate = () => {
    let cartIcon = document.getElementById('cartamount');
    cartIcon.innerHTML=basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculate();








