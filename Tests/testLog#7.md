#Issue #7

**TESTED BY:** MANPREET KAUR  
**TESTED ON:** 21st March

## Test Cases

### TEST 1 - Student who completed the course

#### TEST 1.1 - Is the route only accessible by the admin?
- **Expected:** Only the admin should be able to access the route (`http://localhost:3000/admin/stats/{slug}`)
- **Actual:** The access has been denied to normal user but granted to the admin.
- **Image - User:** images/image-10.png
- **Test Result:** Pass ✅

#### TEST 1.2 - Is the total number of students who completed the courses correct?
- **Expected:** The number of students who completed the course should be correct.
- **Actual:** The number of students who completed the course is correct.
- **Image - User:** images/image-11.png
- **Test Result:** Pass ✅

### TEST 2 - Total number of enrolled students in each course

#### TEST 2.1 - Is the total number of students who are enrolled in the courses correct?
- **Expected:** The number of enrolled students on the course should be correct.
- **Actual:** The number of enrolled students on the course is correct.
- **Image - User:** images/image-11.png
- **Test Result:** Pass ✅

### TEST 3 - Total number of students who started the course

#### TEST 3.1 - Is the total number of students who have started the courses correct?
- **Expected:** The number of students that started the course should be correct.
- **Actual:** The number of students that started the course is correct.
- **Image - User:** images/image-11.png
- **Test Result:** Pass ✅

### TEST 4 - Courses that need improvements (review < 3.0)

#### TEST 4.1 - Are the courses review average < 3.0 highlighted in red?
- **Expected:** The displayed review card should be highlighted in red if review average < 3.0.
- **Actual:** The displayed card is highlighted in red.
- **Image - User:** images/image-11.png
- **Test Result:** Pass ✅

#### TEST 4.2 - Are the courses review average > 3.0highlighted in green?
- **Expected:** The displayed review card should be highlighted in green if review average > 3.0.
- **Actual:** The displayed card is highlighted in green.
- **Image - User:** images/image-12.png
- **Test Result:** Pass ✅
