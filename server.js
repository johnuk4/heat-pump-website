const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// IMPORTANT: Serve static files BEFORE routes
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

// Temporary in-memory storage
let leads = [];
let leadIdCounter = 1;

// API Routes
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

    const lead = {
        id: leadIdCounter++,
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        postcode: postcode,
        location: quizAnswers[1] || '',
        ownership: quizAnswers[2] || '',
        current_heating: quizAnswers[3] || '',
        property_type: quizAnswers[4] || '',
        bedrooms: quizAnswers[5] || '',
        epc_status: quizAnswers[6] || '',
        installation_timeline: quizAnswers[7] || '',
        is_eligible: isEligible,
        consent: consent,
        source: source || 'website',
        created_at: new Date().toISOString(),
        status: 'new',
        notes: ''
    };

    leads.push(lead);

    res.json({
        success: true,
        leadId: lead.id,
        message: 'Lead submitted successfully'
    });

    console.log(`New lead: ${firstName} ${lastName}`);
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
    res.json(leads);
});

app.get('/api/stats', (req, res) => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

    const stats = {
        totalLeads: leads.length,
        eligibleLeads: leads.filter(l => l.is_eligible).length,
        todayLeads: leads.filter(l => l.created_at.split('T')[0] === today).length,
        weekLeads: leads.filter(l => new Date(l.created_at) >= weekAgo).length,
        monthLeads: leads.filter(l => new Date(l.created_at) >= monthAgo).length,
        pendingCommissions: 0,
        paidCommissions: 0
    };

    res.json(stats);
});

app.put('/api/leads/:id', (req, res) => {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    const lead = leads.find(l => l.id === parseInt(id));
    if (lead) {
        lead.status = status;
        lead.notes = notes;
        res.json({ success: true, changes: 1 });
    } else {
        res.status(404).json({ error: 'Lead not found' });
    }
});

app.get('/api/export/csv', (req, res) => {
    if (leads.length === 0) {
        return res.send('No leads to export');
    }

    const headers = Object.keys(leads[0]).join(',');
    const csvRows = leads.map(lead => 
        Object.values(lead).map(val => `"${val}"`).join(',')
    );
    const csv = [headers, ...csvRows].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
    res.send(csv);
});

// Serve admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// IMPORTANT: This must be LAST - catch-all route for homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Export for Vercel
module.exports = app;
