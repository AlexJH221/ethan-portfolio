document.addEventListener('DOMContentLoaded', () => {
  // Function to initialize the dropdown and toggle functionality
  const initializeNavbar = () => {
    // Dropdown functionality
    let dropdown = document.getElementsByClassName("dropdown-btn");
    for (let i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", (e) => {
        let dropdownLink = e.target;
        dropdownLink.classList.toggle("active");
        let dropdownContent = dropdownLink.nextElementSibling;
        dropdownContent.classList.toggle("show");
      });
    }

    // Highlight the current link and expand the relevant dropdown
    const links = document.querySelectorAll('#navbar a');
    console.log(links);
    links.forEach(link => {
      if (link.href === (window.location.href + '.html') && link.pathname !== '/index.html') {
        link.classList.add('active-link');
        console.log(link.pathname);

        // Find parent dropdown containers and show them
        let parent = link.parentElement;
        while (parent && parent.id !== 'navbar') {
          if (parent.classList.contains('dropdown-container')) {
            parent.classList.add('show');
            const dropdownButton = parent.previousElementSibling;
            if (dropdownButton && dropdownButton.classList.contains('dropdown-btn')) {
              dropdownButton.classList.add('active');
            }
          }
          parent = parent.parentElement;
        }
      }
    });

    // Mobile nav toggle functionality
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navbar = document.getElementById('navbar');

    mobileNavToggle.addEventListener('click', () => {
      document.body.classList.toggle('toggle');
      navbar.classList.toggle('toggle');
    });
  };

  // Load the navbar
  fetch('/navbar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar-placeholder').innerHTML = data;
      initializeNavbar(); // Initialize navbar functionality after loading
    });
});

