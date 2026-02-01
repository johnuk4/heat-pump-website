// Vercel Serverless Function for Getting Lead Statistics

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        let leads = [];

        // Fetch from Vercel KV if available
        if (process.env.KV_REST_API_URL) {
            const { kv } = await import('@vercel/kv');
            const leadIds = await kv.lrange('leads:all', 0, -1);
            
            for (const leadId of leadIds) {
                const leadData = await kv.get(`lead:${leadId}`);
                if (leadData) {
                    leads.push(typeof leadData === 'string' ? JSON.parse(leadData) : leadData);
                }
            }
        }

        const now = new Date();
        const today = now.toISOString().split('T')[0];
        const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

        const stats = {
            totalLeads: leads.length,
            eligibleLeads: leads.filter(l => l.isEligible).length,
            todayLeads: leads.filter(l => l.createdAt && l.createdAt.split('T')[0] === today).length,
            weekLeads: leads.filter(l => l.createdAt && new Date(l.createdAt) >= weekAgo).length,
            monthLeads: leads.filter(l => l.createdAt && new Date(l.createdAt) >= monthAgo).length,
            pendingCommissions: 0,
            paidCommissions: 0
        };

        return res.status(200).json(stats);

    } catch (error) {
        console.error('Error calculating stats:', error);
        return res.status(500).json({ 
            error: 'Failed to calculate stats',
            message: error.message 
        });
    }
}
