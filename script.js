document.getElementById('lookupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nationalId = document.getElementById('nationalId').value;
    fetch('data.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').map(row => row.split(','));
            const headers = rows[0];
            const nationalIdIndex = headers.indexOf('National_ID');
            const usernameIndex = headers.indexOf('username');
            const usercodeIndex = headers.indexOf('UserCode');

            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                if (row[nationalIdIndex] === nationalId) {
                    document.getElementById('result').innerHTML = `
                        <p>Username: ${row[usernameIndex]}</p>
                        <p>User Code: ${row[usercodeIndex]}</p>
                    `;
                    return;
                }
            }
            document.getElementById('result').innerHTML = '<p>No data found.</p>';
        });
});
