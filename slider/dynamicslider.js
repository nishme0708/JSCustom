// you can do it using flex - that will wrap all the elements imgs in a row
// or you can use position absolute so all overlap
// and change the left property by looping over all the elements
function fetchImage(){
    return fetch('https://picsum.photos/1000').then(res=>{
        return res.url;
    });
}

const slider = document.querySelector('.slider');
const images = document.getElementsByClassName('slide');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
let counter = 0;
const clientWidth = slider.clientWidth;
let current = null;


function getImageNode(url) {
    let div = document.createElement('li');
    div.classList.add('slide')
    let node = document.createElement('img');
    node.setAttribute('src',url);
    div.appendChild(node);
    return div;
}

function getImage(){
    return fetchImage().then(url=>{
        let div = getImageNode(url);
        div.style.left = (images.length*clientWidth)+'px';
        slider.appendChild(div);
        current = div;
        return div;
    });
}

function nextHandler() {
    if(!current || !current.nextElementSibling){
        getImage().then(move);
    } else{
        current = current.nextElementSibling;
        move();
    }
}

next.addEventListener('click', nextHandler);

prev.addEventListener('click', function(){
    if(!current || !current.previousElementSibling){
        return;
    } else {
        current = current.previousElementSibling;
        move(current);
    }
});


function move(){
    prev.classList.remove('hidden');
    if(!current.previousElementSibling) {
        prev.classList.add('hidden');
    } 
    
    let moveBy = current.style.left
    slider.style.transform = `translate(-${moveBy})`;
}

function checkState(){

}

nextHandler();