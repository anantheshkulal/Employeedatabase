const recordForm = document.getElementById('record-form');
const nameInput = document.getElementById('name');
const idInput = document.getElementById('id');
const ageInput = document.getElementById('age');
const emailInput = document.getElementById('email');
const salaryInput = document.getElementById('salary');
const recordList = document.getElementById('record-list');
const editIndexInput = document.getElementById('edit-index');
const successMessage = document.getElementById('success-message');

// Initialize records from local storage
let records = JSON.parse(localStorage.getItem('records')) || [];

// Function to check for duplicate names
function isDuplicateName(email) {
  return records.some(
    (record) => record.email.toLowerCase() === email.toLowerCase()
  );
}

// Function to validate email format
function isEmailValid(email) {
  // Regular expression for validating email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Display records
function displayRecords() {
  recordList.innerHTML = '';
  if (records.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="7" style="text-align:center;color:red;">No Record Found</td>`;
    recordList.appendChild(row);
  } else {
    records.forEach((record, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
                    <td>${record.name}</td>
                    <td>${record.id}</td>
                    <td>${record.age}</td>
                    <td>${record.email}</td>
                    <td>${record.salary}</td>
                    <td><button onclick="editRecord(${index})">Edit</button></td>
                    <td class="deleteButton"><button onclick="deleteRecord(${index})">Delete</button></td>
                `;
      recordList.appendChild(row);
    });
  }
}

// Add or Update a record
recordForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = nameInput.value;
  const id = idInput.value;
  const age = ageInput.value;
  const email = emailInput.value;
  const salary = salaryInput.value;
  const editIndex = parseInt(editIndexInput.value);

  if (name && id && age && email && salary ) {
    if (!isEmailValid(email)) {
      alert('Email is invalid.');
      return;
    }

    if (isDuplicateName(email) && editIndex === -1) {
      alert('Student already exists.');
      return;
    }

    if (editIndex === -1) {
      // Add a new record
      records.push({ name, id, age, email, salary });
      displayRecords();
      successMessage.textContent = "Record added successfully.";
    } else {
      // Update an existing record
      records[editIndex] = { name, id, age, email, salary };
      editIndexInput.value = -1;
      displayRecords();
      successMessage.textContent = "Record edited successfully.";
    }

    localStorage.setItem('records', JSON.stringify(records));
    nameInput.value = '';
    idInput.value = '';
    ageInput.value = '';
    emailInput.value = '';
    salaryInput.value = '';
  }
});

// Edit a record
function editRecord(index) {
  const recordToEdit = records[index];
  nameInput.value = recordToEdit.name;
  idInput.value = recordToEdit.id;
  ageInput.value = recordToEdit.age;
  emailInput.value = recordToEdit.email;
  salaryInput.value = recordToEdit.salary;
  editIndexInput.value = index;
}

// Delete a record
function deleteRecord(index) {
  // Display confirmation message
  const confirmDelete = confirm("Are you sure you want to delete this record?");
  
  // If user confirms deletion
  if (confirmDelete) {
    records.splice(index, 1);
    localStorage.setItem('records', JSON.stringify(records));
    displayRecords();
    successMessage.textContent = "Record deleted successfully.";
  }
}
