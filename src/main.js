import LumeCode from "./scripts/components/lume_code.js";
import LumeCarousel from "./scripts/vendor/carousel/carousel.js";
import LumeCarouselControls from "./scripts/components/lume_carousel_controls.js";
import LumeFilter from "./scripts/components/lume_filter.js";
import Cookies from "./scripts/components/cookies.js";

customElements.define("lume-code", LumeCode);
customElements.define("lume-carousel", LumeCarousel);
customElements.define("lume-carousel-controls", LumeCarouselControls);
customElements.define("lume-filter", LumeFilter);
customElements.define("badger-cookies", Cookies);

// For testing purpose of CSP middleware
const userAgentString = navigator.userAgent;
const chromeAgent = userAgentString.indexOf("Chrome") > -1;

if (chromeAgent) {
   const observer = new ReportingObserver((reports) => {
      for (const report of reports) {
         console.log(report.type, report.url, report.body);
      }
   }, { buffered: true });

   observer.observe();
}


function onKeyDown(event) {
   const isOpen = location.pathname === "/search/";
   // 27 is escape, to close the search
   // The `Cmd+K` shortcut both opens and closes the modal.
   if (event.keyCode === 27 && isOpen || event.key === 'k' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();

      if (isOpen) {
         history.back();
      } else {
         location.pathname = "/search/";
      }
   }
}
function focusInput(event) {
   const isOpen = location.pathname === "/search/"; if (isOpen) {
      setTimeout(() => {
         document.getElementsByClassName('pagefind-ui__search-input')[0].focus();
      }, 300);
   }
}

self.addEventListener('keydown', onKeyDown);
self.addEventListener('DOMContentLoaded', focusInput);