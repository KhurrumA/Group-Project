const enrollButton = document.getElementById('enrollButton');
if (enrollButton) {
        const courseId = this.getAttribute('data-course-id');

        fetch('/recordprogress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            
            },
            body: JSON.stringify({ courseId: courseId})
        })
        .then(response => response.json())
        .then(data => console.log('Course enrollment recorded:', data))
        .catch(error => console.error('Error:', error));
    ;
}
