# Upload Picture (Issue #9)

**TESTED BY:** MANPREET KAUR  
**TESTED ON:** 20th March

## Test Cases

### TEST 1 - Is the route only accessible by the logged in users?
- **Expected:** Only the logged in user can access this route (`http://localhost:3000/account/uploadPhoto`)
- **Actual:** The access has been denied when tried to access the route without logging in.
- **Image - User:** images/image-5.png
- **Test Result:** Pass ✅

### TEST 2 - Can the user see the current profile picture?
- **Expected:** The user should be able to see the current profile picture next to the upload button.
- **Actual:** The user can see the current profile picture next to the upload button.
- **Image - User:** images/image6.png
- **Test Result:** Pass ✅

### TEST 3 - Can the user only choose image files?
- **Expected:** The user should be able to only choose image files from his local storage.
- **Actual:** The user can choose only image files from his local storage.
- **Image - User:** images/image7.png
- **Test Result:** Pass ✅

#### TEST 3.1 - Is the selected file name being displayed on the screen?
- **Expected:** The user should be able to see the file name that he has chosen.
- **Actual:** The user can see the chosen file name.
- **Image - User:** images/image8.png
- **Test Result:** Pass ✅

### TEST 4 - Is the file uploaded correctly with a success message?
- **Expected:** The user should be able to see an alert message when the image has been uploaded successfully.
- **Actual:** The user can see a success message.
- **Image - User:** images/image9.png
- **Test Result:** Pass ✅
