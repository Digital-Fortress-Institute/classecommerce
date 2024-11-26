let mylabel = document.getElementById('label');
let myshoppingCart = document.getElementById('cartItem');
let basket =JSON.parse(localStorage.getItem('data')) || [];
console.log(basket)

let calculate = () => {
    let cartIcon = document.getElementById('cartamount');
    cartIcon.innerHTML=basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}
calculate();


let generateCartItem = () => {

    
    if (basket.length !== 0){
        myshoppingCart.innerHTML = basket.map((x) => {
            let {id, item} = x

            let search = myShopProduct.find((y) => y.id == id)
            return(
                `
                <div>
                <img width="100" src=${search.img} alt = />

                <div>
                    <h3>${search.name}</h3>
                    <h6>&#x20A6; ${search.price}</h6>
                    <h3 onclick="removeItem(${id})">X</h3>
                
                </div>
                  <div>
                   <div>
                    <span onclick='myincrease(${id})'>+</span>
                    <span id=${id}>${item}</span>
                    <span onclick="mydecrease(${id})">-</span>
                  </div>
                  <h3>${item * search.price}</h3>
                
                </div>

                
                </div>
                `
            )
        }).join('')



    }else{
        console.log('basket is empty')
        myshoppingCart.innerHTML= ``
        mylabel.innerHTML = `
        <h4>Cart is Empty</h4>
        <a href="./index.html">Go Home</a>
        `
    }
}
generateCartItem();


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
    generateCartItem();
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
    generateCartItem();
    localStorage.setItem('data', JSON.stringify(basket));
    
}

let updateItem = (id) => {
    let search = basket.find((x) => x.id == id);
    console.log(search.item)
    document.getElementById(id).innerHTML=search.item
    calculate()
    totalAmount()
}


let removeItem = (id) => {
    let selected = id
    console.log(selected.id)
    basket= basket.filter((x) => x.id !== selected.id)
    generateCartItem();
    calculate()
    localStorage.setItem('data', JSON.stringify(basket));
}

let totalAmount = () => {
    if (basket.length !== 0){

        let amount = basket.map((x) => {
            let { id, item} = x
            let search = myShopProduct.find((y) => y.id == id)
            return search.price * item

        }).reduce((prev, next) => prev + next, 0);

        mylabel.innerHTML= `
        <h3>Total amount: ${amount}</h3>
        <button>Check Out</button>
        <button onclick="clearCart()">Clear Cart</button>
        `

    }else return
}
totalAmount()


let clearCart = () => {
    basket = []
    generateCartItem();
    calculate()
    localStorage.setItem('data', JSON.stringify(basket));
}

