// you can do it using flex - that will wrap all the elements imgs in a row
// or you can use position absolute so all overlap
// and change the left property by looping over all the elements

const slider = document.querySelector('.slider');
const images = document.querySelectorAll('.slide');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const totalImages = images.length;
let counter = 1;
const clientWidth = images[0].clientWidth;
images[0].classList.add('current');

function updateLeft(image, index) {
    image.style.left = (index * clientWidth)+"px";
}

images.forEach(updateLeft);
next.addEventListener('click', function() {
    debugger;
    const current = document.querySelector('.current');
    const next = current.nextElementSibling;
    const move = next.style.left;
    slider.style.transform = `translate(-${move})`;
    current.classList.remove('current');
    next.classList.add('current');
    counter++;
    updateArrow();
});

function updateArrow() {
    if(counter==images.length) {
        next.classList.add('hidden');
        prev.classList.remove('hidden');
    }
    if(counter==1) {
        prev.classList.add('hidden');
        next.classList.remove('hidden');
    }
}

prev.addEventListener('click', function(){
    debugger;
    const current = document.querySelector('.current');
    const prev = current.previousElementSibling;
    const move = prev.style.left;
    slider.style.transform = `translate(-${move})`;
    current.classList.remove('current');
    prev.classList.add('current');
    counter--;
    updateArrow();
});

updateArrow();