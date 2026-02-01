// Vercel Serverless Function for Lead Submission
// This uses Vercel KV (Redis) for data storage

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            postcode,
            consent,
            quizAnswers,
            source,
            timestamp
        } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !phone || !postcode || !consent) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Determine eligibility
        const isEligible = determineEligibility(quizAnswers);

        // Create lead object
        const leadId = Date.now() + Math.random().toString(36).substr(2, 9);
        const lead = {
            id: leadId,
            firstName,
            lastName,
            email,
            phone,
            postcode,
            location: quizAnswers[1] || '',
            ownership: quizAnswers[2] || '',
            currentHeating: quizAnswers[3] || '',
            propertyType: quizAnswers[4] || '',
            bedrooms: quizAnswers[5] || '',
            epcStatus: quizAnswers[6] || '',
            installationTimeline: quizAnswers[7] || '',
            isEligible,
            consent,
            source: source || 'website',
            createdAt: timestamp || new Date().toISOString(),
            status: 'new'
        };

        // Store in Vercel KV (if available) or fallback to environment variable logging
        if (process.env.KV_REST_API_URL) {
            // Use Vercel KV
            const { kv } = await import('@vercel/kv');
            await kv.set(`lead:${leadId}`, JSON.stringify(lead));
            await kv.lpush('leads:all', leadId);
        } else {
            // Fallback: Log to console (for development)
            console.log('Lead submitted:', JSON.stringify(lead, null, 2));
        }

        // Send email notification (if configured)
        if (process.env.NOTIFICATION_EMAIL) {
            await sendEmailNotification(lead);
        }

        return res.status(200).json({
            success: true,
            leadId: leadId,
            message: 'Lead submitted successfully'
        });

    } catch (error) {
        console.error('Error submitting lead:', error);
        return res.status(500).json({ 
            success: false,
            error: 'Failed to submit lead',
            message: error.message 
        });
    }
}

function determineEligibility(answers) {
    if (!answers) return false;
    
    // Check location (England or Wales)
    if (!['england', 'wales'].includes(answers[1])) {
        return false;
    }
    
    // Check ownership
    if (answers[2] === 'no') {
        return false;
    }
    
    // Check if not already has heat pump
    if (answers[3] === 'heat-pump') {
        return false;
    }
    
    return true;
}

async function sendEmailNotification(lead) {
    // Email notification logic (implement with SendGrid, Resend, etc.)
    // Example with Resend:
    /*
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
        from: 'leads@yourdomain.com',
        to: process.env.NOTIFICATION_EMAIL,
        subject: `New Lead: ${lead.firstName} ${lead.lastName}`,
        html: `
            <h2>New Heat Pump Lead</h2>
            <p><strong>Name:</strong> ${lead.firstName} ${lead.lastName}</p>
            <p><strong>Email:</strong> ${lead.email}</p>
            <p><strong>Phone:</strong> ${lead.phone}</p>
            <p><strong>Postcode:</strong> ${lead.postcode}</p>
            <p><strong>Eligible:</strong> ${lead.isEligible ? 'Yes' : 'No'}</p>
        `
    });
    */
    console.log('Email notification would be sent for lead:', lead.id);
}
