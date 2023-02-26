const list = document.querySelectorAll('.list');
function activelink() {
    list.forEach((item) => item.classList.remove('active'));
    this.classList.add('active');
}
list.forEach((item)=> item.addEventListener('mouseover', activelink));

/* list.forEach((item)=> {
    item.addEventListener('click', () => {
        var value = button.value;
        if(value==="1"){ location.href="map/index2.html";}    
    })
});
 */
