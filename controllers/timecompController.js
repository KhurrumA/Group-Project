const progressId = 'your_progress_id_here'; // Replace with the actual progressId

// Find the progress document by ID
Progress.findById(progressId, (err, progress) => {
    if (err) {
        //Error handling
        console.error(err);
        return;
    }

    if (progress) {
        // Update the completionTime field with the current date and time
        progress.completionTime = new Date(); 

        // Save the updated document
        progress.save((saveErr) => {
            if (saveErr) {
                // Handle save error
                console.error(saveErr);
            } else {
                // Progress document updated successfully
                console.log('Completion time recorded:', progress.completionTime);
            }
        });
    } else {
        console.log('Progress document not found');
    }
});
//Uses findById method to find a specific "Progress" document by its ID("progressID").
//completionTime field is updated with current date and time and saves the document
//code assumes you have the progressID available when user clicks complete