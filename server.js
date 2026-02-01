const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));

// Initialize SQLite database
let db;
function initializeDatabase() {
    db = new sqlite3.Database(':memory:', (err) => {
        if (err) {
            console.error('Error opening database:', err);
        } else {
            console.log('Connected to in-memory SQLite database');
            createTables();
        }
    });
}

function createTables() {
    db.run(`
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            postcode TEXT NOT NULL,
            location TEXT,
            ownership TEXT,
            current_heating TEXT,
            property_type TEXT,
            bedrooms TEXT,
            epc_status TEXT,
            installation_timeline TEXT,
            is_eligible BOOLEAN,
            consent BOOLEAN,
            source TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            status TEXT DEFAULT 'new',
            notes TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS affiliate_earnings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lead_id INTEGER,
            commission_amount DECIMAL(10, 2),
            commission_status TEXT DEFAULT 'pending',
            installer_name TEXT,
            installation_date DATE,
            payment_date DATE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (lead_id) REFERENCES leads(id)
        )
    `);
}

// Initialize on startup
initializeDatabase();

// API endpoint to submit lead
app.post('/api/submit-lead', (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        postcode,
        consent,
        quizAnswers,
        source
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !postcode || !consent) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const isEligible = determineEligibility(quizAnswers);

    const sql = `
        INSERT INTO leads (
            first_name, last_name, email, phone, postcode,
            location, ownership, current_heating, property_type,
            bedrooms, epc_status, installation_timeline,
            is_eligible, consent, source
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
        firstName,
        lastName,
        email,
        phone,
        postcode,
        quizAnswers[1] || '',
        quizAnswers[2] || '',
        quizAnswers[3] || '',
        quizAnswers[4] || '',
        quizAnswers[5] || '',
        quizAnswers[6] || '',
        quizAnswers[7] || '',
        isEligible,
        consent,
        source || 'website'
    ];

    db.run(sql, params, function(err) {
        if (err) {
            console.error('Error inserting lead:', err);
            return res.status(500).json({ error: 'Failed to save lead' });
        }

        res.json({
            success: true,
            leadId: this.lastID,
            message: 'Lead submitted successfully'
        });

        console.log(`New lead created: ${firstName} ${lastName} (ID: ${this.lastID})`);
    });
});

function determineEligibility(answers) {
    if (!['england', 'wales'].includes(answers[1])) {
        return false;
    }
    if (answers[2] === 'no') {
        return false;
    }
    if (answers[3] === 'heat-pump') {
        return false;
    }
    return true;
}

app.get('/api/leads', (req, res) => {
    const sql = 'SELECT * FROM leads ORDER BY created_at DESC';
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error fetching leads:', err);
            return res.status(500).json({ error: 'Failed to fetch leads' });
        }
        res.json(rows);
    });
});

app.get('/api/stats', (req, res) => {
    const queries = {
        totalLeads: 'SELECT COUNT(*) as count FROM leads',
        eligibleLeads: 'SELECT COUNT(*) as count FROM leads WHERE is_eligible = 1',
        todayLeads: "SELECT COUNT(*) as count FROM leads WHERE DATE(created_at) = DATE('now')",
        weekLeads: "SELECT COUNT(*) as count FROM leads WHERE created_at >= DATE('now', '-7 days')",
        monthLeads: "SELECT COUNT(*) as count FROM leads WHERE created_at >= DATE('now', '-30 days')",
        pendingCommissions: "SELECT SUM(commission_amount) as total FROM affiliate_earnings WHERE commission_status = 'pending'",
        paidCommissions: "SELECT SUM(commission_amount) as total FROM affiliate_earnings WHERE commission_status = 'paid'"
    };

    const stats = {};
    let completed = 0;
    const total = Object.keys(queries).length;

    Object.keys(queries).forEach(key => {
        db.get(queries[key], [], (err, row) => {
            if (!err) {
                stats[key] = row.count || row.total || 0;
            }
            completed++;
            if (completed === total) {
                res.json(stats);
            }
        });
    });
});

app.put('/api/leads/:id', (req, res) => {
    const { id } = req.params;
    const { status, notes } = req.body;

    const sql = 'UPDATE leads SET status = ?, notes = ? WHERE id = ?';
    
    db.run(sql, [status, notes, id], function(err) {
        if (err) {
            console.error('Error updating lead:', err);
            return res.status(500).json({ error: 'Failed to update lead' });
        }
        res.json({ success: true, changes: this.changes });
    });
});

app.post('/api/commission', (req, res) => {
    const {
        leadId,
        commissionAmount,
        installerName,
        installationDate
    } = req.body;

    const sql = `
        INSERT INTO affiliate_earnings (
            lead_id, commission_amount, installer_name, installation_date
        ) VALUES (?, ?, ?, ?)
    `;

    db.run(sql, [leadId, commissionAmount, installerName, installationDate], function(err) {
        if (err) {
            console.error('Error recording commission:', err);
            return res.status(500).json({ error: 'Failed to record commission' });
        }
        res.json({ success: true, commissionId: this.lastID });
    });
});

app.get('/api/export/csv', (req, res) => {
    const sql = 'SELECT * FROM leads ORDER BY created_at DESC';
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error exporting leads:', err);
            return res.status(500).json({ error: 'Failed to export leads' });
        }

        if (rows.length === 0) {
            return res.send('No leads to export');
        }

        const headers = Object.keys(rows[0]).join(',');
        const csvRows = rows.map(row => 
            Object.values(row).map(val => `"${val}"`).join(',')
        );
        const csv = [headers, ...csvRows].join('\n');

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
        res.send(csv);
    });
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Export for Vercel
module.exports = app;

// For local development
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}