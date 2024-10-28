// content.js

function highlightField(field) {
    if (field) {
      field.style.border = '12px solid red';  // Add a red border to highlight the field
      console.log('Highlighting field:', field);
    }
  }
  
  function clearHighlight(field) {
    if (field) {
      field.style.border = '';  // Remove the red border if field is filled
    }
  }
  
  function findFieldByLabel(labelText) {
    // Find all rows in the sidebar
    const rows = document.querySelectorAll('.psa-row.psa-label-value-pair');
  
    // Iterate over each row to find the matching label
    for (let row of rows) {
      const labelElement = row.querySelector('.psa-label-field');
      if (labelElement && labelElement.textContent.trim() === labelText) {
        // Find the corresponding value field
        const valueField = row.querySelector('.psa-value-field .inline-editor__read-only span');
        return valueField;
      }
    }
  
    return null;
  }
  
  function checkRequiredFields() {
    console.log('Checking required fields...');
  
    // Use the helper function to find the fields based on their label text
    const assigneeField = findFieldByLabel('Assignee');
    const secondaryAssigneeField = findFieldByLabel('Secondary Assignee(s)');
    const issueTypeField = findFieldByLabel('Issue Type');
    const subIssueTypeField = findFieldByLabel('Sub-Issue Type');
    const contactField = findFieldByLabel('Contact');
  
    // Check the ticket status
    const statusField = document.querySelector('.psa-ticket-status-dropdown .psa-ticket-status-dropdown-label');
    const isTicketClosed = statusField && statusField.textContent.trim() === 'Closed';
  
    // Reset highlighting before each check
    clearHighlight(assigneeField);
    clearHighlight(secondaryAssigneeField);
    clearHighlight(issueTypeField);
    clearHighlight(subIssueTypeField);
    clearHighlight(contactField);
  
    // Track if any field is missing
    let missingFields = false;
  
    // Highlight fields that are empty or contain "Select"
    if (!assigneeField || assigneeField.textContent.trim() === 'Select') {
      highlightField(assigneeField);
      missingFields = true;
    }
    if (!issueTypeField || issueTypeField.textContent.trim() === 'Select') {
      highlightField(issueTypeField);
      missingFields = true;
    }
    if (!subIssueTypeField || subIssueTypeField.textContent.trim() === 'Select') {
      highlightField(subIssueTypeField);
      missingFields = true;
    }
    if (isTicketClosed && (!contactField || contactField.textContent.trim() === 'Select')) {
      highlightField(contactField);
      missingFields = true;
    }
  
    // Notify if fields are missing
    if (missingFields) {
      chrome.runtime.sendMessage({ type: 'notification', message: 'Some required fields are not filled out!' });
    } else {
      console.log('All required fields are filled.');
    }
  }
  
  // Run check on page load and periodically (in case fields are updated dynamically)
  document.addEventListener('DOMContentLoaded', checkRequiredFields);
  setInterval(checkRequiredFields, 5000); // Recheck every 5 seconds
  