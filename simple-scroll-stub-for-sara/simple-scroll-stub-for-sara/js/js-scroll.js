const scrollElements = document.querySelectorAll(".js-scroll");
scrollElements.forEach((el) => {
  if(elementInView(el, .2, .5, .10 )){
    console.log('view')
    displayScrollElemnt(el)
  }
}
)
window.addEventListener('scroll',handLeScrollAnimation)
//display functions
//ckecks whether element is in viewable area 
function elementInView(el, amountInView = 1 ) {
  const elementTop = el.getBoundingClientRect().top;
  const elementHeight = el.getBoundingClientRect().height;
  console.log(elementTop, elementHeight)
  return (
    elementTop + elementHeight * amountInView <= document.documentElement.
    clientHeight && elementTop + elementHeight *amountInView > 0
  )
}
//ckecks whether element is in viewable area 
function elementOutOfView(el) {
  const elementTop =el.getBoundingClientRect().top;
  const elementBottom = el.getBoundingClientRect().bottom;
  return(
    elementTop >= document.documentElement.clientHeight || elementBottom
    < 0
  )
}
//show element
function displayScrollElemnt(el){
el.classList.add("scrolled");
}
//hide element
function hideScrollElment(el){
  el.classList.remove("scrolled")
}
function handLeScrollAnimation(){
  scrollElements.forEach((el) => {
    if(elementInView(el, .5)) {
      displayScrollElemnt(el)
    } else if (elementOutOfView(el)){
      hideScrollElment(el)
    }
  })
}
//UTILITY
// throttle - fn = function to call, wait = interval in ms
function throttle(fn, wait){
  let inThrottle, lastFn, lastTime;
  return function() {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function() {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};
