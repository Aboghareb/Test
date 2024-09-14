document.getElementById('lookupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nationalId = document.getElementById('nationalId').value;
    fetch('data.csv')
        .then(response => response.text())
        .then(data => {
            console.log("CSV Data:", data); // Log the raw CSV data
            const rows = data.split('\n').map(row => row.split(','));
            console.log("Rows:", rows); // Log the parsed rows
            
            const headers = rows[0];
            console.log("Headers:", headers); // Log headers
            const nationalIdIndex = headers.indexOf('National_ID');
            const usernameIndex = headers.indexOf('username');
            const usercodeIndex = headers.indexOf('UserCode');

            if (nationalIdIndex === -1 || usernameIndex === -1 || usercodeIndex === -1) {
                console.error("Missing expected headers");
                return;
            }

            let found = false;
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                console.log("Row Data:", row); // Log row data
                if (row[nationalIdIndex] === nationalId) {
                    document.getElementById('result').innerHTML = `
                        <p>Username: ${row[usernameIndex]}</p>
                        <p>User Code: ${row[usercodeIndex]}</p>
                    `;
                    found = true;
                    break;
                }
            }

            if (!found) {
                document.getElementById('result').innerHTML = '<p>No data found.</p>';
            }
        })
        .catch(error => {
            console.error("Error fetching or processing data:", error);
            document.getElementById('result').innerHTML = '<p>An error occurred.</p>';
        });
});
