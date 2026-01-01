const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    // Cloudflare automatically adds this header after login
    const userEmail = req.headers['cf-access-authenticated-user-email'] || "Not Logged In";

    // Change this to your actual email
    const ADMIN_EMAIL = '___';

    const isAdmin = userEmail === ADMIN_EMAIL;

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>StudyFlow</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f4f7f9; color: #333; display: flex; justify-content: center; padding-top: 50px; }
                .card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); width: 100%; max-width: 500px; text-align: center; }
                h1 { color: #2d3436; margin-bottom: 10px; }
                .user-info { font-size: 0.9em; color: #636e72; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 20px; }
                .badge { background: ${isAdmin ? '#d63031' : '#0984e3'}; color: white; padding: 5px 12px; border-radius: 20px; font-size: 0.8em; text-transform: uppercase; }
                .content { margin-top: 20px; line-height: 1.6; }
                button { background: #00b894; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 10px; }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>StudyFlow</h1>
                <div class="user-info">
                    Logged in as: <b>${userEmail}</b> <br><br>
                    <span class="badge">${isAdmin ? 'Admin' : 'Student'}</span>
                </div>
                <div class="content">
                    ${isAdmin
        ? `<h3>Admin Workspace</h3>
                           <p>You can manage assignments and view student progress here.</p>
                           <button>Create New Quiz</button> <button>View Grades</button>`
        : `<h3>Student Dashboard</h3>
                           <p>Welcome to StudyFlow! Your homework for this week is ready.</p>
                           <button>Open Assignments</button>`
    }
                </div>
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, () => console.log(`StudyFlow is running locally on http://localhost:${PORT}`));