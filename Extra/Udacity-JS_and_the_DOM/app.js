
const mainHeading = document.querySelector('h1');


document.addEventListener('click', event => {
    mainHeading.style.backgroundColor = 'red';
    console.log(event);
    console.log('event.clientX :', event.clientX);
    console.log('event.clientY :', event.clientY);
    console.log('event.screenX :', event.screenX);
    console.log('event.screenY :', event.screenY);
    console.log('event.pageX :', event.pageX);
    console.log('event.pageY :', event.pageY);

})
