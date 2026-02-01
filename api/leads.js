// Vercel Serverless Function for Getting All Leads

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
            
            // Sort by createdAt descending
            leads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else {
            // Fallback: Return empty array in development
            leads = [];
        }

        return res.status(200).json(leads);

    } catch (error) {
        console.error('Error fetching leads:', error);
        return res.status(500).json({ 
            error: 'Failed to fetch leads',
            message: error.message 
        });
    }
}
