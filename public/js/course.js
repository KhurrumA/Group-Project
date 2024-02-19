script.
document.addEventListener('DOMContentLoaded', function () {
    function finishCourse() {
        try {
            const courseId = courseId;  
            fetch('/course-click', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ courseId: courseId })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                location.assign('/dashboard');

            })
            .catch(error => {
                console.error('Error:', error);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }
});


