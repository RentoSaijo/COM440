User Database Lookup
====================

Requires Node.js 22.12 or newer and npm: https://nodejs.org/en/download

Run locally
Extract the ZIP file and open a terminal in the project3 folder. Run:

    npm install
    npm run dev

Open a second terminal in the same project3 folder. Run:

    cd src/server
    npm install
    node server.js

Keep both terminals running and open http://localhost:5173/ in a browser.
The backend runs on port 3001. Press Ctrl+C in each terminal to stop.

Enter salary in thousands as a nonnegative whole number.
Records are stored in memory. Restarting the backend restores the seven
sample users and clears any changes.
