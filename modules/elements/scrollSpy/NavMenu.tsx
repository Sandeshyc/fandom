import React, { useState, useLayoutEffect, useEffect } from "react";
import ScrollSpy from "./ScrollSpy";

interface NavMenuOption {
  hash: string;
  title: string;
}

const onScrollUpdate = (entry: IntersectionObserverEntry, isInVewPort: boolean) => {
  const { target, boundingClientRect } = entry;
  const menuItem = document.querySelector(`[data-scrollspy-id="${target.id}"]`) as HTMLElement;
  if (boundingClientRect.y <= 0 && isInVewPort) {
    menuItem.classList.add("active");
  } else {
    if (menuItem.classList.contains("active")) {
      menuItem.classList.remove("active");
    }
  }
};
type NavMenuProps = {
    options: NavMenuOption[];
};
const NavMenu = ({ options }: NavMenuProps) => {
    const [mainNavHeight, setMainNavHeight] = useState(0);
    const [navbarTop, setNavbarTop] = useState(0);

    const onClick = (e:any) => {
        e.preventDefault();
        const scrollNavItemsMenu = document.querySelector('#scrollNavItemsMenu');
        if(scrollNavItemsMenu){
            scrollNavItemsMenu.classList.add('fixed');
        }
        window.location.hash = e.currentTarget.hash;
        const targetSection = document.querySelector(`${e.currentTarget.hash}`);
        window.scrollTo(0, targetSection!.offsetTop + 1);
        return false;
    };
    
    useEffect(() => {
        const handleScroll = () => {
            const mainNavbar = document.querySelector('.mainNavbar');
            const navBar = document.querySelector('.ScrollSpyNav');
            const scrollNavItemsMenu = document.querySelector('#scrollNavItemsMenu');
            if(navBar && mainNavbar) {
                const mainNavbarBound = mainNavbar?.getBoundingClientRect();
                setMainNavHeight(mainNavbarBound?.height);
                const navBarBound = navBar?.getBoundingClientRect();
                console.log('navBarBound: ', navBarBound);
                let tempTop = navBarBound?.top;
                setNavbarTop(tempTop);
                console.log('navBarBound: ', mainNavHeight, 'navbarTop: ', navbarTop);                
                if(scrollNavItemsMenu){
                    if (mainNavbarBound?.height > navBarBound?.top) {
                        scrollNavItemsMenu.classList.add('fixed');
                    }else{
                        scrollNavItemsMenu.classList.remove('fixed');
                    }
                }                    
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  return (
    <nav id='scrollNavItemsMenu' className={` mb-8 z-50 w-full left-0 bg-black ${(mainNavHeight > navbarTop) ? 'fixed' : ''}`} style={{top: `${mainNavHeight}px`}}>
      <ul className="container mx-auto border-b border-gray-600 flex lg:pt-4 text-base overflow-x-auto">
        {options.map((option) => (
          <li key={option.hash}>
            <a
                className="block py-3 px-4 min-w-[120px] lg:min-w-[160px] text-center border-b-4 border-transparent whitespace-nowrap scrollSpyItem"
              href={`#${option.hash}`}
              onClick={onClick}
              data-scrollspy-id={option.hash}>
              {option.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const WithNavMenu: React.FC<{ selector: string }> = ({ children, selector }) => {
  const [options, setOptions] = useState<NavMenuOption[]>([]);
  useLayoutEffect(() => {
    const navMenuSections = document.querySelectorAll(selector);
    const optionsFromSections: NavMenuOption[] = Array.from(navMenuSections).map((section) => ({
      hash: section?.id,
      title: section?.dataset?.navTitle || ""
    }));
    setOptions(optionsFromSections);
  }, [selector]);

  return (
    <div className="ScrollSpyNav">
      <ScrollSpy handleScroll={onScrollUpdate} />
      <div className="relative">
        <NavMenu options={options} />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default WithNavMenu;
