//half hald effect
const left = document.getElementById("left-side");

const handleMove = e => {
    const p = e.clientX / window.innerWidth *100;

    left.style.width = `${p}%`;
}

document.onmousemove = e => handleMove(e);

document.ontouchmove = e => handleMove(e.touches[0]);

// photos moving after mouse efect 
const images = document.getElementsByClassName("imagem");

let globalIndex = 0,
    last = { x: 0, y: 0 };

const activate = (imagem, x, y) => {
  imagem.style.left = `${x}px`;
  imagem.style.top = `${y}px`;
  imagem.style.zIndex = globalIndex;

  imagem.dataset.status = "active";

  last = { x, y };
}

const distanceFromLast = (x, y) => {
  return Math.hypot(x - last.x, y - last.y);
}

const handleOnMove = e => {
  if(distanceFromLast(e.clientX, e.clientY) > (window.innerWidth / 20)) {
    const lead = images[globalIndex % images.length],
          tail = images[(globalIndex - 5) % images.length];

    activate(lead, e.clientX, e.clientY);

    if(tail) tail.dataset.status = "inactive";
    
    globalIndex++;
  }
}

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

//intersection observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
})

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

//xray effect
/*
 * Noel Delgado | @pixelia_me
 *
*/
// does not work

// var svgElement = document.querySelector('svg');
// var maskedElement = document.querySelector('#mask-circle');
// var circleFeedback = document.querySelector('#circle-shadow');
// var svgPoint = svgElement.createSVGPoint();

// function cursorPoint(e, svg) {
//     svgPoint.x = e.clientX;
//     svgPoint.y = e.clientY;
//     return svgPoint.matrixTransform(svg.getScreenCTM().inverse());
// }

// function update(svgCoords) {
//     maskedElement.setAttribute('cx', svgCoords.x);
//     maskedElement.setAttribute('cy', svgCoords.y);
//     circleFeedback.setAttribute('cx', svgCoords.x);
//     circleFeedback.setAttribute('cy', svgCoords.y);
// }

// window.addEventListener('mousemove', function(e) {
//   update(cursorPoint(e, svgElement));
// }, false);

// document.addEventListener('touchmove', function(e) {
//     e.preventDefault();
//     var touch = e.targetTouches[0];
//     if (touch) {
//         update(cursorPoint(touch, svgElement));
//     }
// }, false);


// live counter

var live = document.getElementById('live');

function time() {
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  live.textContent = 
    200 + ("0" + h).substr(-2) + ("0" + m).substr(-2) + ("0" + s).substr(-2);
}

setInterval(time, 1000);