
(function() {
  "use strict";



  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

    /**
   * Edge sidebar reveal
   */
  const edgeSidebar = document.querySelector('#edgeSidebar');

  if (edgeSidebar) {
    document.addEventListener('mousemove', function(e) {
      if (e.clientX < 60) {
        edgeSidebar.classList.add('visible');
      } else if (e.clientX > 220) {
        edgeSidebar.classList.remove('visible');
      }
    });
  }


  /**
   * Skill toolkit hover-scroll
   */
  const skillScroll = document.querySelector('#skillScroll');

  if (skillScroll) {
    let scrollDirection = 0;
    let scrollAnimId = null;

    function autoScroll() {
      if (scrollDirection !== 0) {
        skillScroll.scrollLeft += scrollDirection;
        scrollAnimId = requestAnimationFrame(autoScroll);
      } else {
        scrollAnimId = null;
      }
    }

    skillScroll.addEventListener('mousemove', function(e) {
      const rect = skillScroll.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const edgeZone = 80;

      if (x < edgeZone) {
        scrollDirection = -2;
      } else if (x > rect.width - edgeZone) {
        scrollDirection = 2;
      } else {
        scrollDirection = 0;
      }

      if (scrollDirection !== 0 && !scrollAnimId) {
        autoScroll();
      }
    });

    skillScroll.addEventListener('mouseleave', function() {
      scrollDirection = 0;
    });
  }

  
    /**
   * Project tile video hover
   */
  document.querySelectorAll('.project-tile').forEach(tile => {
    const video = tile.querySelector('.project-video');
    if (video) {
      tile.addEventListener('mouseenter', () => video.play());
      tile.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
      });
    }
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

    /**
   * Fullscreen menu toggle
   */
  const menuToggleBtn = document.querySelector('#menuToggle');
  const menuOverlay = document.querySelector('#menuOverlay');

  if (menuToggleBtn && menuOverlay) {
    menuToggleBtn.addEventListener('click', function() {
      menuToggleBtn.classList.toggle('active');
      menuOverlay.classList.toggle('active');
    });

    document.querySelectorAll('.overlay-nav a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggleBtn.classList.remove('active');
        menuOverlay.classList.remove('active');
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);


  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();