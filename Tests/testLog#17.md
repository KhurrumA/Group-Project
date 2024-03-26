# Issue #17 - Delete Review

**TESTED BY:** MANPREET KAUR  
**TESTED ON:** 20th March

## Test Cases

### TEST 1 - Is the route only accessible by the admin?

- **Expected:** Only the admin should be able to access this route (`http://localhost:3000/admin/courses`)
- **Actual:** The access has been granted only to the admin.
- **Image - User:** images/issue_17/image.png
- **Image - Admin:** images/issue_17/image-1.png
- **Test Result:** Pass ✅

### TEST 2 - Can the admin see the courses with review count?

- **Expected:** The admin should be able to see all the available courses with the number of reviews.
- **Actual:** The reviews are grouped under their courses.
- **Image:**images/issue_17/image-2.png
- **Test Result:** Pass ✅

### TEST 3 - Can the admin delete a review?

- **Expected:** The admin should be able to delete the review when he clicks on the delete button.
- **Actual:** The review has been successfully deleted from the database.
- **Image:** images/issue_17/image-4.png images/issue_17/image-3.png
- **Test Result:** Pass ✅
