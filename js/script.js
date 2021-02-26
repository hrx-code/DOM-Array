const main=document.getElementById('main');
const add_user=document.getElementById('add-user');
const double_money=document.getElementById('double-money');
const millionaire=document.getElementById('millionaire');
const sort_by_richest=document.getElementById('sort-by-richest');
const totalWealth=document.getElementById('total-wealth');

let data=[];

// getRandomUser();


async function getRandomUser(){
    const res= await fetch('https://randomuser.me/api');
    const data= await res.json();
    //console.log(data);
    const user=data.results[0];
    //console.log(user);
    const newUser={
        name:`${user.name.first} ${user.name.last}`,
        money:Math.floor(Math.random()*1000000)
    }
    addData(newUser);
}

function doubleMoney(){
    data=data.map((user)=>{
        return {...user,money:user.money*2};
    });
    updateDOM();
}

function sortByRichest(){
    data.sort((a,b)=>b.money-a.money);
    updateDOM();
}

function sortByMillionaire(){
    data=data.filter(function(item){
        return item.money>1000000;
    })
    updateDOM();
}

function calculateWealth(){
    const wealth=data.reduce((acc,user)=>(acc +=user.money),0);
    
    const element=document.createElement('div');
    element.innerHTML=`<h3>Total Wealth:<strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(element);
}

function addData(obj){
    data.push(obj);

    updateDOM();
}

function updateDOM(providedData=data){
    main.innerHTML='<h2><strong>Person</strong>Wealth</h2>';

    providedData.forEach( item =>{
        const element=document.createElement('div');
        element.classList.add('person');
        element.innerHTML=`<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    })
}

function formatMoney(number){
    return'$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// event listener

add_user.addEventListener('click',getRandomUser);

// double-money

double_money.addEventListener('click',doubleMoney);

// sort
sort_by_richest.addEventListener('click',sortByRichest);

// millionaire

millionaire.addEventListener('click',sortByMillionaire);

// total

totalWealth.addEventListener('click',calculateWealth);