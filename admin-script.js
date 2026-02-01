let allLeads = [];

async function loadStats() {
    try {
        const response = await fetch('/api/stats');
        const stats = await response.json();
        
        document.getElementById('totalLeads').textContent = stats.totalLeads || 0;
        document.getElementById('eligibleLeads').textContent = stats.eligibleLeads || 0;
        document.getElementById('monthLeads').textContent = stats.monthLeads || 0;
        document.getElementById('weekLeads').textContent = stats.weekLeads || 0;
        document.getElementById('todayLeads').textContent = stats.todayLeads || 0;
        document.getElementById('pendingEarnings').textContent = (stats.pendingCommissions || 0).toFixed(2);
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

async function loadLeads() {
    try {
        const response = await fetch('/api/leads');
        allLeads = await response.json();
        displayLeads(allLeads);
    } catch (error) {
        console.error('Error loading leads:', error);
        document.getElementById('leadsTableBody').innerHTML = `
            <tr><td colspan="7" class="empty-state">
                <div>Error loading leads. Please try again.</div>
            </td></tr>
        `;
    }
}

function displayLeads(leads) {
    const tbody = document.getElementById('leadsTableBody');
    
    if (leads.length === 0) {
        tbody.innerHTML = `
            <tr><td colspan="7" class="empty-state">
                <div>No leads found</div>
            </td></tr>
        `;
        return;
    }

    tbody.innerHTML = leads.map(lead => `
        <tr>
            <td>${String(lead.id).substr(0, 8)}</td>
            <td>${lead.firstName} ${lead.lastName}</td>
            <td>
                <div>${lead.email}</div>
                <div style="font-size: 12px; color: #6B7280;">${lead.phone}</div>
            </td>
            <td>${lead.postcode}</td>
            <td>
                <span class="badge ${lead.isEligible ? 'badge-success' : 'badge-warning'}">
                    ${lead.isEligible ? 'Yes' : 'No'}
                </span>
            </td>
            <td>${formatDate(lead.createdAt)}</td>
            <td>
                <button class="action-btn" onclick='viewLead(${JSON.stringify(lead).replace(/'/g, "\\'")})'>View</button>
            </td>
        </tr>
    `).join('');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function viewLead(lead) {
    const detailsHtml = `
        <div class="detail-row">
            <div class="detail-label">Name:</div>
            <div class="detail-value">${lead.firstName} ${lead.lastName}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Email:</div>
            <div class="detail-value"><a href="mailto:${lead.email}">${lead.email}</a></div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Phone:</div>
            <div class="detail-value"><a href="tel:${lead.phone}">${lead.phone}</a></div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Postcode:</div>
            <div class="detail-value">${lead.postcode}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Location:</div>
            <div class="detail-value">${lead.location || 'N/A'}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Property Type:</div>
            <div class="detail-value">${lead.propertyType || 'N/A'}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Bedrooms:</div>
            <div class="detail-value">${lead.bedrooms || 'N/A'}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Current Heating:</div>
            <div class="detail-value">${lead.currentHeating || 'N/A'}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">EPC Status:</div>
            <div class="detail-value">${lead.epcStatus || 'N/A'}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Installation Timeline:</div>
            <div class="detail-value">${lead.installationTimeline || 'N/A'}</div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Eligible:</div>
            <div class="detail-value">
                <span class="badge ${lead.isEligible ? 'badge-success' : 'badge-warning'}">
                    ${lead.isEligible ? 'Yes' : 'No'}
                </span>
            </div>
        </div>
        <div class="detail-row">
            <div class="detail-label">Created:</div>
            <div class="detail-value">${formatDate(lead.createdAt)}</div>
        </div>
    `;

    document.getElementById('leadDetails').innerHTML = detailsHtml;
    document.getElementById('leadModal').classList.add('active');
}

function closeModal() {
    document.getElementById('leadModal').classList.remove('active');
}

function refreshLeads() {
    loadStats();
    loadLeads();
}

function exportCSV() {
    if (allLeads.length === 0) {
        alert('No leads to export');
        return;
    }

    const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Postcode', 'Location', 'Property Type', 'Bedrooms', 'Current Heating', 'EPC Status', 'Timeline', 'Eligible', 'Created'];
    const csvRows = allLeads.map(lead => [
        lead.id,
        lead.firstName,
        lead.lastName,
        lead.email,
        lead.phone,
        lead.postcode,
        lead.location || '',
        lead.propertyType || '',
        lead.bedrooms || '',
        lead.currentHeating || '',
        lead.epcStatus || '',
        lead.installationTimeline || '',
        lead.isEligible ? 'Yes' : 'No',
        lead.createdAt
    ].map(val => `"${val}"`).join(','));

    const csv = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `heat-pump-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

document.getElementById('searchInput').addEventListener('input', filterLeads);
document.getElementById('eligibilityFilter').addEventListener('change', filterLeads);

function filterLeads() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const eligibilityFilter = document.getElementById('eligibilityFilter').value;

    const filtered = allLeads.filter(lead => {
        const matchesSearch = 
            lead.firstName.toLowerCase().includes(searchTerm) ||
            lead.lastName.toLowerCase().includes(searchTerm) ||
            lead.email.toLowerCase().includes(searchTerm) ||
            lead.phone.includes(searchTerm) ||
            lead.postcode.toLowerCase().includes(searchTerm);

        const matchesEligibility = !eligibilityFilter || String(lead.isEligible) === eligibilityFilter;

        return matchesSearch && matchesEligibility;
    });

    displayLeads(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
    refreshLeads();
    setInterval(refreshLeads, 60000);
});
