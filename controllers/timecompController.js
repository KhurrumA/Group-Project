const progressId = 'your_progress_id_here'; // Replace with the actual progressId

// Find the progress document by ID
Progress.findById(progressId, (err, progress) => {
    if (err) {
        //Error handling
        console.error(err);
        return;
    }