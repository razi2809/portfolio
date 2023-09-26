document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const formVisible = document.getElementById("contact-form-visible");
  const formSubmitted = document.getElementById("formSubmitted");

  const form = document.getElementById("contactMe");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get the form input values
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const textarea = document.getElementById("textarea").value;

    // Simulate form submission and show success message
    simulateFormSubmission(fullName, phoneNumber, email, textarea);
  });

  function simulateFormSubmission(fullName, phoneNumber, email, textarea) {
    // Perform any necessary form submission logic here
    // For demonstration purposes, we'll simulate a delay using setTimeout

    // Show success message after a delay
    setTimeout(() => {
      showFormSubmitted();
    }, 200); // Adjust the delay (in milliseconds) as needed
  }

  function showFormSubmitted() {
    formVisible.classList.add("hide");
    formSubmitted.classList.add("show");
  }

  function isElementInViewport(element) {
    var rect = element.getBoundingClientRect();
    var viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    var offset = Math.min(element.offsetHeight, viewportHeight) / 2; // Half of the smaller of the element's height and the viewport height

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom - offset <= viewportHeight &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  function setActiveNavLink() {
    var sections = document.querySelectorAll("#contact-form ");

    sections.forEach(function (section) {
      var navLink = document.querySelector('a[href="#' + section.id + '"]');

      if (isElementInViewport(section)) {
        navLink.classList.add("active");
        // console.log(section.id + " is in view");
      } else {
        navLink.classList.remove("active");
      }
    });
  }

  // Check if the target section is in the viewport when the page is loaded and scrolled
  window.addEventListener("DOMContentLoaded", setActiveNavLink);
  window.addEventListener("scroll", setActiveNavLink);
});
document.addEventListener("DOMContentLoaded", () => {
  const mobileNav = document.querySelector(".navBar");
  const navToggle = document.querySelector(".mobile-nav-toggle");
  navToggle.addEventListener("click", () => {
    const visibility = mobileNav.getAttribute("data-visible");
    // console.log(visibility);
    if (visibility === "false") {
      mobileNav.setAttribute("data-visible", true);
      navToggle.setAttribute("aria-expanded", true);
    } else {
      mobileNav.setAttribute("data-visible", false);
      navToggle.setAttribute("aria-expanded", false);
    }
  });
});
