const menuitems = document.querySelectorAll('.menu-item');

console.log("welcome");
console.log(menuitems);


const changeActiveItem = () => {
    menuitems.forEach(item =>{
        item.classList.remove('active')
    })
}
menuitems.forEach(item => {
    item.addEventListener('click',()=>{
        changeActiveItem();
        item.classList.add('active');
        if (item.id!='notification'){
            document.querySelector('.notifictions-popup').getElementsByClassName.display = 'none'
        }
        else{
            console.log(true)
            document.querySelector(".notifications-popup").style.display = "block";

        }
    })
})
