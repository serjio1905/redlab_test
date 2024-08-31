const order = document.querySelector('.order--wrapper');
const orderButton = document.querySelector('.order__button');
let orderRect = order.getBoundingClientRect();
const menuButton = document.querySelector('.header__burger');
const menu = document.querySelector('.header__burger--menu');
const menuSwitchButtons = document.querySelectorAll('.header__switch--item');
const features = document.querySelectorAll('.features__item');

function onSwitch(index) {
    for (let i = 0; i < menuSwitchButtons.length; i++) {
        if (i !== index) {
            menuSwitchButtons[i].classList.remove('active');
        }
    }
    menuSwitchButtons[index].classList.add('active');
}

function initFeaturesAnimation() {
    const observer = new IntersectionObserver(
        entries => entries.forEach((entry, idx) => setTimeout(() => entry.target.classList.toggle("visible", entry.isIntersecting), idx * 100)),
        { threshold: .1 }
    );
    features.forEach(feature => observer.observe(feature));
};

function closeMainMenu() {
    if (menuButton.classList.contains("active")) {
        menuButton.classList.remove("active");
        menu.classList.remove("active");
    }
}

function openMainMenu() {
    menuButton.classList.add("active");
    menu.classList.add("active");
}

function switchMainMenu() {
    if (menuButton.classList.contains("active")) {
        closeMainMenu();
    } else {
        openMainMenu();
    }
}

function orderMouseoverHandler(e, isFirst) {
    const y = e.clientY - orderRect.top - (orderButton.clientHeight / 2);
    const yMax = order.clientHeight - orderButton.clientHeight;
    const yK = .5 - (e.clientY - orderRect.top) / order.clientHeight;

    const x = e.clientX - orderRect.left - (orderButton.clientWidth / 2);
    const xMax = order.clientWidth - orderButton.clientWidth;
    const xK = Math.max(Math.min((((e.clientX - orderRect.left) / order.clientWidth) - .5), .9), -.9); 
    
    orderButton.style.top = Math.min(Math.max(y + (orderButton.clientHeight * yK)), yMax) + 'px';
    orderButton.style.left = Math.min(Math.max(x - (orderButton.clientWidth * xK)), xMax) + 'px';
    if (isFirst) {
        setTimeout(() => {
            if (orderButton.style.transition !== 'none') orderButton.style.transition = 'none';
        }, 200);
    }
}

function initOrderButtonAnimation() {
    setTimeout(() => {
        orderRect = order.getBoundingClientRect();
        order.removeEventListener('mousemove', orderMouseoverHandler);
        order.addEventListener('mouseout', function(e) {
            if ((e.target === order && e.toElement !== orderButton) || (e.target === orderButton && e.toElement !== order)) {
                order.removeEventListener('mousemove', orderMouseoverHandler);
                orderButton.style.transition = 'all .1s linear';
                orderButton.style.top = '4rem';
                orderButton.style.left = '5rem';
            }
        });
        order.addEventListener('mouseenter', function(e) {
            setTimeout(() => {
                orderMouseoverHandler(e, true);
                order.addEventListener('mousemove', orderMouseoverHandler);
            }, 50);
        });
    }, 300);
}

function activate() {
    initFeaturesAnimation();
    initOrderButtonAnimation();
    window.addEventListener('resize', initOrderButtonAnimation);
    window.addEventListener('scroll', closeMainMenu);
}

activate();