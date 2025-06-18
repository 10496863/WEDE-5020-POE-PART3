document.getElementById('contact us').addEventListener('submit', function(event) {
  event.preventDefault();

  // Clear previous errors and success message
  const errorFields = ['fullname', 'email', 'subject', 'feelings'];
  errorFields.forEach(field => {
      document.getElementById('error-' + field).textContent = '';
  });
  const successMessage = document.getElementById('success-message');
  successMessage.textContent = '';

  let hasError = false;

  // Validate full name (non-empty)
  const fullName = document.getElementById('fullname').value.trim();
  if (!fullName) {
      document.getElementById('error-fullname').textContent = 'Please enter your full name.';
      hasError = true;
  }

  // Validate email (non-empty and valid format)
  const email = document.getElementById('email').value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
      document.getElementById('error-email').textContent = 'Please enter your email address.';
      hasError = true;
  } else if (!emailPattern.test(email)) {
      document.getElementById('error-email').textContent = 'Please enter a valid email address.';
      hasError = true;
  }

  // Validate subject (non-empty)
  const subject = document.getElementById('subject').value.trim();
  if (!subject) {
      document.getElementById('error-subject').textContent = 'Please enter the subject.';
      hasError = true;
  }

  // Validate feelings (non-empty)
  const feelings = document.getElementById('feelings').value.trim();
  if (!feelings) {
      document.getElementById('error-feelings').textContent = 'Please express your feelings.';
      hasError = true;
  }

  if (hasError) {
      // Focus first error field to help user
      for (let field of errorFields) {
          if (document.getElementById('error-' + field).textContent !== '') {
              document.getElementById(field).focus();
              break;
          }
      }
      return;
  

    
      // Simple search function with highlight on the page content inside #searchableContent
      const searchInput = document.getElementById('searchInput');
      const contentContainer = document.getElementById('searchableContent');
  
      // Function to remove existing highlights
      function removeHighlights(element) {
        const highlightedSpans = element.querySelectorAll('span.highlight');
        highlightedSpans.forEach(span => {
          span.replaceWith(document.createTextNode(span.textContent));
        });
      }
  
      // Function to highlight matching text recursively
      function highlightText(element, query) {
        if (!query) return;
  
        const regex = new RegExp(`(${query})`, 'gi');
  
        element.childNodes.forEach(node => {
          if (node.nodeType === 3) {
            // Text node
            const match = node.textContent.match(regex);
            if (match) {
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = node.textContent.replace(
                regex,
                '<span class="highlight">$1</span>'
              );
              while (tempDiv.firstChild) {
                element.insertBefore(tempDiv.firstChild, node);
              }
              element.removeChild(node);
            }
          } else if (node.nodeType === 1) {
            // Element node, recurse but skip script and style tags
            if (!['SCRIPT', 'STYLE'].includes(node.tagName)) {
              highlightText(node, query);
            }
          }
        });
      }
  
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        // Remove old highlights
        removeHighlights(contentContainer);
        if (query.length > 0) {
          highlightText(contentContainer, query);
        }
      });
    
      // Form validation & submission
      joinForm.addEventListener('submit', function(event) {
        event.preventDefault();
        clearFormErrors();
        const nameInput = document.getElementById('nameInput');
        const emailInput = document.getElementById('emailInput');
        let valid = true;
        if (nameInput.value.trim() === '') {
          showError('nameError', 'Name is required.');
          valid = false;
        }
        if (!validateEmail(emailInput.value.trim())) {
          showError('emailError', 'Please enter a valid email address.');
          valid = false;
        }
        if (valid) {
          alert(`Thank you, ${nameInput.value.trim()}! Your request to join has been received.`);
          closeModal();
        }
      });
      function showError(elementId, message) {
        document.getElementById(elementId).textContent = message;
      }
      function clearFormErrors() {
        showError('nameError', '');
        showError('emailError', '');
      }
      // Email validation regex
      function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());

    }
}
}