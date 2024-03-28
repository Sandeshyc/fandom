import React, { useState, useEffect, useRef, use } from 'react';

const SpyNav = ({ sections }:{sections:any}) => {
  const [activeSection, setActiveSection] = useState('');
  const [isFixed, setIsFixed] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const [mainNavHeight, setMainNavHeight] = useState(0);
  const navRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      const wrapperElement = document.querySelector('.secSpyNavWrapper');
      const navElement = document.querySelector('.secSpyNav');

      if (!wrapperElement || !navElement) return;

      const wrapperTop = wrapperElement.getBoundingClientRect().top;
      const navTop = navElement.getBoundingClientRect().top;
      // console.log('navTop', navTop);

      setIsFixed(wrapperTop <= mainNavHeight);

      if (wrapperTop >= mainNavHeight) {
        setIsFixed(false);
      }

      for (const section of sections) {
        const { id } = section;
        const element = document.getElementById(id);

        if (element) {
          const elementTop = element.offsetTop - (navHeight + mainNavHeight);
          const elementBottom = elementTop + element.offsetHeight;
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(id);
            // console.log('activeSection', id);
            const navLink = document.querySelector(`.secSpyNav a[href="#${id}"]`);
            // console.log('navLink', navLink);
            if(navLink) {
              const { top, height, width, left, right } = navLink.getBoundingClientRect();
              const scrollSpyNav = document.querySelector('.secSpyNav ul');
              if(scrollSpyNav) {
                const scrollSpyNavWidth = scrollSpyNav?.clientWidth;
                // console.log('parent', scrollSpyNavWidth, 'id', id, 'width', width, 'left', left, 'right', right);
                if(scrollSpyNavWidth){
                  if((left + width) > scrollSpyNavWidth){
                    console.log('scrollBy Right', left, right);
                    scrollSpyNav.scrollBy({ left: left, behavior: 'smooth' });
                  }else if(left < 5) {
                    console.log('scrollBy Left', left, right);
                    scrollSpyNav.scrollBy({ left: left - scrollSpyNavWidth, behavior: 'smooth' });
                  }else if(right > scrollSpyNavWidth) {
                    console.log('scrollBy Left', right);
                    scrollSpyNav.scrollBy({ left: right - scrollSpyNavWidth, behavior: 'smooth' });
                  }
                }                
              }              
            }
            break;
          }
        }
      }
    };

    const handleResize = () => {
      setNavHeight(navRef?.current?.clientHeight);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    handleResize(); // Initial height calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [sections]);
  const clickHandler = (e:any) => {
    e.preventDefault();
    const target = e.target;
    const href = target.getAttribute('href');
    const targetElement = document.querySelector(href);
    // remove # from href
    const hrefId = href.replace('#', '');
    if (targetElement) {
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY - (navHeight+mainNavHeight),
        behavior: 'smooth',
      });
      setTimeout(() => {
        setActiveSection(hrefId);
      }, 300);
    }
  }

  useEffect(() => {
    const mainNavbar = document.querySelector('.mainNavbar');
    if(mainNavbar) {
        const mainNavbarBound = mainNavbar?.getBoundingClientRect();
        setMainNavHeight(mainNavbarBound?.height);
    }
  }, []);

  return (
    <div className='secSpyNavWrapper'
    style={{ paddingTop: (isFixed)?navHeight+'px':'0px'}}
    >
      <div ref={navRef} className={`secSpyNav w-full bg-black py-3 left-0 z-20 ${isFixed ? 'fixed' : ''}`}
      style={{ top: mainNavHeight+'px'}}
      >
        <ul className={`container mx-auto border-b border-gray-600 flex text-base overflow-x-auto ${isFixed ? 'px-4' : ''}`}>
          {sections.map(({ id, label }:{id:string, label:string}) => (
            <li key={id} className={`block py-3 px-2 lg:px-4 lg:min-w-[160px] text-sm lg:text-base text-center border-b-4 border-transparent whitespace-nowrap ${(activeSection === id) ? 'border-b-blue-600' : ''}`}>
              <a href={`#${id}`} onClick={clickHandler}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SpyNav;
