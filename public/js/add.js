// Get the input field and search button elements
const searchInput = document.getElementById('searchInput'); // Assuming 'searchInput' is the ID of your input field
const searchButton = document.getElementById('searchButton'); // Assuming 'searchButton' is the ID of your search button

// Add an event listener to the search button for searching a user by username
if (searchButton) {
  searchButton.addEventListener('click', async () => {
    const username = searchInput.value.trim(); // Get the username entered by the user

    if (username) {
      try {
        const response = await fetch(`/v1/users/search/${username}`); // Assuming this is the correct endpoint for searching users
        const data = await response.json();

        if (data.status === 'success') {
          // Handle the user data returned from the search
          console.log('User found:', data.data.user);
        } else {
          console.log('User not found');
        }
      } catch (error) {
        console.error('Error searching for user:', error);
      }
    } else {
      console.log('Please enter a username to search');
    }
  });
}

// Get the add friend button elements
const addFriendButtons = document.querySelectorAll('.addfriend'); // Assuming 'addfriend' is the class of your add friend buttons

// Add event listeners to each add friend button for adding a friend
if (addFriendButtons) {
  addFriendButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const friendId = button.dataset.friendId; // Get the friend's ID from the button's data attribute

      try {
        const response = await fetch(`/api/friends/add/${friendId}`, { method: 'POST' }); // Assuming this is the correct endpoint for adding friends
        const data = await response.json();

        if (data.status === 'success') {
          // Handle success message or update UI accordingly
          console.log('Friend added successfully');
        } else {
          console.log('Error adding friend:', data.message);
        }
      } catch (error) {
        console.error('Error adding friend:', error);
      }
    });
  });
}