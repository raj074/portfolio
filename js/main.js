// ! Navigation menu
(()=>{
    const hamburgerBtn = document.querySelector(".hamburger-btn");
    const navMenu = document.querySelector(".nav-menu");
    const closeNavBtn = navMenu.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener('click',showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);

    function showNavMenu(){
        navMenu.classList.add('open')
        bodyScrollingToggle();
    }

    function hideNavMenu() {
      navMenu.classList.remove("open");
      fadeOutEffet();
      bodyScrollingToggle();
    }

    function fadeOutEffet(){
        document.querySelector(".fade-out-effect").classList.add('active');
        setTimeout(() =>{
            document.querySelector(".fade-out-effect").classList.remove("active");
        },300)
    }

    document.addEventListener('click',(event)=>{
        if(event.target.classList.contains('link-item')){
            if(event.target.hash !== ''){
                
                event.preventDefault();
                const hash = event.target.hash;
                console.log(hash);
                document.querySelector('.section.active').classList.add('hide');
                document.querySelector('.section.active').classList.remove('active');
                document.querySelector(hash).classList.add('active');
                document.querySelector(hash).classList.remove('hide');

                navMenu.querySelector('.active').classList.add('outer-shadow','hover-in-shadow');
                navMenu.querySelector('.active').classList.remove('active','inner-shadow');
                
                if(navMenu.classList.contains('open')){
                    event.target.classList.add('active','inner-shadow');
                    event.target.classList.remove("outer-shadow", "hover-in-shadow");
                    hideNavMenu();
                }else{
                    let navItems = navMenu.querySelectorAll('.link-item');
                    navItems.forEach((item) =>{
                        if(hash === item.hash){
                            item.classList.add('active','inner-shadow');
                            item.classList.remove("outer-shadow", "hover-in-shadow");
                        }
                    })
                    fadeOutEffet();
                }
                window.location.hash = hash;
            }
        }
    })

})();




function bodyScrollingToggle(){
    document.body.classList.toggle('stop-scrolling');
}



//*! portfolio popup section

(() =>{
    const portfolioItemsContainer = document.querySelector('.portfolio-items'),
    portfolioItems = document.querySelectorAll('.portfolio-item'),
    popup = document.querySelector(".portfolio-popup");

    const prevBtn = popup.querySelector('.pp-prev'),
    nextBtn = popup.querySelector('.pp-next'),
    closeBtn = popup.querySelector('.pp-close'),
    projectDetailsContainer = popup.querySelector('.pp-details'),
    projectDetailsBtn = popup.querySelector('.pp-project-details-btn');

    let itemIndex,slideIndex,screenshots;

    portfolioItemsContainer.addEventListener('click',(event)=>{
        if(event.target.closest('.portfolio-item-inner')){
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector('.portfolio-item-img img').getAttribute('data-screenshots');
            screenshots = screenshots.split(',');
            if(screenshots.length === 1){
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
            }else{
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            slideIndex = 0;
            popupToogle();
            popupSlideshow();
            popupDetails();
        }   
    })

    closeBtn.addEventListener('click',()=>{
        popupToogle();
        if(projectDetailsContainer.classList.contains('active')){
            popupDetailsToggle();
        }
    })

    function popupToogle(){
        popup.classList.toggle('open');
        bodyScrollingToggle();
    }

    function popupSlideshow(){
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector('.pp-img');
        popup.querySelector('.pp-loader').classList.add('active');
        popupImg.src = imgSrc;
        popupImg.onload = () =>{
            popup.querySelector(".pp-loader").classList.remove("active");
        }

        popup.querySelector('.pp-counter').innerHTML = (slideIndex + 1) + ' of ' + (screenshots.length);
    }

    nextBtn.addEventListener('click',()=>{
        if(slideIndex === screenshots.length-1){
            slideIndex = 0;
        }else{
            slideIndex++;
        }
        popupSlideshow();
        
    })

    prevBtn.addEventListener("click", () => {
      if (slideIndex === 0) {
        slideIndex = screenshots.length-1;
      } else {
        slideIndex--;
      }
      popupSlideshow();
      
    });

    function popupDetails(){
        const details = portfolioItems[itemIndex].querySelector('.portfolio-item-details').innerHTML;
        popup.querySelector('.pp-project-details').innerHTML = details;
        const title = portfolioItems[itemIndex].querySelector('.portfolio-item-title').innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;
    }

    projectDetailsBtn.addEventListener('click',()=>{
        popupDetailsToggle();
    })

    function popupDetailsToggle(){
        if(projectDetailsContainer.classList.contains('active')){
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + 'px';
        }else{
            projectDetailsBtn.querySelector('i').classList.remove('fa-plus');
            projectDetailsBtn.querySelector('i').classList.add('fa-minus');
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + 'px';
            popup.scrollTo(0,projectDetailsContainer.offsetTop);
        }
    }

})();


// ! Hide sections
(() =>{
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
        if(!section.classList.contains('active')){
            section.classList.add('hide');
        }
    })
    console.log(sections)
})();