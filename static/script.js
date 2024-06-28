document.getElementById('textForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const userInput = document.getElementById('userInput').value;
    const responseParagraph = document.getElementById('response');

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: userInput })
    })
    .then(response => response.json())
    .then(data => {
        responseParagraph.textContent = 'Server response: ' + data.message;
    })
    .catch(error => {
        responseParagraph.textContent = 'Error: ' + error.message;
    });
});

const getStatusURL = 'https://2d0e5073-12a2-48d2-93f5-f493c69f5b45-00-iugslex0v0mx.pike.replit.dev/data';
setInterval(() => {
    fetch(getStatusURL)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const statusParagraph = document.getElementById('status');
        statusParagraph.textContent = data.status;
        if (data.status === 'ONLINE') {
            statusParagraph.style.color = 'green';
            statusParagraph.style.backgroundColor = 'rgba(143, 232, 131, 0.87)';

        } else if (data.status === 'OFFLINE') {
            statusParagraph.style.color = 'red';
            statusParagraph.style.backgroundColor = 'rgba(230, 110, 110, 0.5)';
        }
    })
    .catch(error => {
        const statusParagraph = document.getElementById('status');
        statusParagraph.textContent = 'Error: ' + error.message;
    });
    
},1000);

const getLastText = '/last_text';
setInterval(() => {
    fetch(getLastText)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let last_text  = data.last_text;
        const lastTextParagraph = document.getElementById('last_text');
        lastTextParagraph.textContent = last_text;
    })
    .catch(error => {
        const statusParagraph = document.getElementById('last_text');
        statusParagraph.textContent = 'Error: ' + error.message;
    });
    
},1000);

