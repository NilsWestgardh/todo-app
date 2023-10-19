const checkboxes = document.querySelectorAll('.task-checkbox');

checkboxes.forEach(checkbox => {
    
    checkbox.addEventListener('change', function() {
        
        let associatedLabel = this.nextElementSibling;

        if(this.checked) {
            associatedLabel.classList.add('completed');
        } else {
            associatedLabel.classList.remove('completed');
        }

        fetch(`/update-task/${index}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ completed: this.checked }),
        });
    });
});