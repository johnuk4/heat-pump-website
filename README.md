# Heat Pump Grant Checker - Affiliate Lead Generation Website

A complete, production-ready website for generating leads from the UK Government Boiler Upgrade Scheme. This system captures qualified leads interested in heat pump installations and connects them with MCS-certified installers.

## 🎯 What This Does

This is a **fully functional lead generation website** that:

1. ✅ Attracts visitors searching for heat pump grants
2. ✅ Qualifies them through an interactive 7-question quiz
3. ✅ Captures contact details for eligible prospects
4. ✅ Stores leads in a database for management
5. ✅ Provides admin dashboard for lead tracking
6. ✅ Enables affiliate income through lead sales

## 💰 How to Make Money

### Primary Revenue Stream: Lead Sales

You earn money by selling the leads you generate to heat pump installers. Based on UK market research:

**Average Lead Pricing:**
- Basic leads: £25-50 per lead
- Phone-verified leads: £50-100 per lead
- Appointment-booked leads: £100-150 per lead
- Exclusive leads (sold once): £150-250+ per lead

**Example Monthly Income:**
- 100 leads/month × £75 average = **£7,500/month**
- 200 leads/month × £75 average = **£15,000/month**

### How to Sell Your Leads:

#### Option 1: Direct to Installers (Highest Profit)
Contact heat pump installation companies directly:
- Offer exclusive leads in their coverage areas
- Charge £100-250 per qualified lead
- No middleman = maximum profit

**How to find installers:**
- Search "MCS certified heat pump installer [city]" on Google
- Browse https://mcscertified.com/find-an-installer/
- LinkedIn: Search for heat pump installation companies
- Trade shows and renewable energy events

**Sample pitch email:**
```
Subject: Exclusive Heat Pump Leads in [City]

Hi [Name],

I generate exclusive, pre-qualified heat pump leads in [city/region]. These are homeowners who:
- Are eligible for the £7,500 Boiler Upgrade Scheme
- Have expressed interest in heat pump installation
- Have provided contact details and consent

I'm offering exclusive leads at £[price] each. Would you be interested in receiving leads for your area?

Best regards,
[Your Name]
```

#### Option 2: Lead Aggregators (Lower Profit, Easier)
Platforms that buy leads from you:

1. **Lead Pronto** (leadpronto.co.uk)
   - Buys heat pump leads at £25+ each
   - Revenue share model available

2. **GMS Leads** (gmsleads.co.uk)
   - Established lead buyer
   - Bulk lead purchasing

3. **Watts Marketing** (wattsmarketingltd.co.uk)
   - Large-scale lead buyer
   - Heat pump specialist

4. **Capital Leads** (capital-leads.co.uk)
   - Pays per lead
   - Quick setup

#### Option 3: Affiliate Networks
Join affiliate programs from installer networks:

1. **HPIN (Heat Pump Installer Network)** - £500 referral fee per installation
2. **Grant UK** - Installer affiliate program
3. **Thermal Earth** - Partner program

### Secondary Revenue: Display Ads

Once you have traffic, add Google AdSense or similar:
- Potential: £500-2,000/month with good traffic
- Passive income on top of lead sales

## 📊 Traffic Strategy (How to Get Visitors)

### SEO (Free, Long-term)
**Target Keywords:**
- "heat pump grant eligibility checker"
- "am I eligible for heat pump grant"
- "£7500 heat pump grant"
- "boiler upgrade scheme checker"
- "[city] heat pump grant"

**Content Strategy:**
- Blog posts about heat pump grants
- Local landing pages for different cities
- FAQ pages answering common questions
- Case studies and success stories

### Google Ads (Paid, Immediate)
**Budget:** Start with £500-1,000/month
**Expected Cost Per Click:** £2-7
**Expected Conversion Rate:** 1-5%
**Cost Per Lead:** £40-500 depending on optimization

**Sample Campaign:**
- Target: People searching "heat pump grant"
- Location: England & Wales
- Landing page: Your eligibility checker
- Expected: 10-50 leads per £1,000 spend

### Facebook Ads (Paid, Scalable)
**Budget:** Start with £500/month
**Target Audience:**
- Homeowners aged 35-65
- Interest: Home improvement, energy efficiency
- Location: England & Wales
**Expected:** 20-100 leads per £1,000 spend

### Content Marketing (Free, Medium-term)
- Create comparison guides
- YouTube videos about heat pump grants
- Social media posts
- Guest posting on home improvement blogs

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Web hosting (for production)

### Local Development Setup

1. **Install Dependencies:**
```bash
npm install
```

2. **Start the Server:**
```bash
npm start
```

3. **Access the Website:**
- Main site: http://localhost:3000
- Admin panel: http://localhost:3000/admin

### Files Included

```
/
├── index.html          # Main landing page with quiz
├── admin.html          # Admin dashboard for lead management
├── style.css           # Professional, modern styling
├── script.js           # Quiz logic and form handling
├── server.js           # Backend server with API endpoints
├── package.json        # Dependencies
├── leads.db            # SQLite database (auto-created)
└── README.md           # This file
```

## 🗄️ Database Structure

### Leads Table
Stores all captured leads with:
- Personal info (name, email, phone, postcode)
- Quiz answers (location, property type, heating system, etc.)
- Eligibility status
- Lead status (new, contacted, qualified, converted)
- Timestamps

### Affiliate Earnings Table
Track your commissions:
- Lead ID reference
- Commission amount
- Installation date
- Payment status
- Installer name

## 🎨 Features

### User-Facing:
- ✅ Professional, conversion-optimized design
- ✅ Interactive 7-question eligibility quiz
- ✅ Progress indicator
- ✅ Instant eligibility results
- ✅ Mobile-responsive
- ✅ Fast loading times
- ✅ GDPR-compliant consent forms

### Admin Panel:
- ✅ Real-time lead dashboard
- ✅ Lead statistics (today, week, month, total)
- ✅ Search and filter leads
- ✅ Update lead status
- ✅ Add notes to leads
- ✅ Export to CSV
- ✅ Track earnings

## 📈 Scaling Your Business

### Phase 1: Launch (Month 1)
- Set up website and hosting
- Run small Google Ads test (£500)
- Contact 10-20 local installers
- Goal: 20-50 leads, £1,500-3,000 revenue

### Phase 2: Growth (Months 2-3)
- Optimize ad campaigns
- Scale ad spend to £2,000/month
- Secure 3-5 installer contracts
- Build SEO content
- Goal: 100-150 leads, £7,500-11,000 revenue

### Phase 3: Automation (Months 4-6)
- Hire VA for lead qualification
- Implement automated email sequences
- Expand to new regions
- Build referral program
- Goal: 200-300 leads, £15,000-22,000 revenue

### Phase 4: Scale (6+ months)
- Multiple lead generation sites
- Franchise model to other niches
- Build installer network
- White-label solutions
- Goal: 500+ leads, £35,000+ revenue

## 🔧 Deployment to Production

### Option 1: DigitalOcean (Recommended)
1. Create a Droplet (Ubuntu 22.04)
2. Install Node.js
3. Clone your files
4. Install dependencies: `npm install`
5. Use PM2 to keep server running: `pm2 start server.js`
6. Set up domain and SSL (Let's Encrypt)

**Cost:** $6-12/month

### Option 2: Heroku (Easiest)
1. Create Heroku account
2. Install Heroku CLI
3. Deploy with: `git push heroku main`
4. Database: Upgrade to hobby tier for persistence

**Cost:** $7-25/month

### Option 3: AWS (Most Scalable)
1. Set up EC2 instance
2. Configure security groups
3. Deploy application
4. Use RDS for database
5. CloudFront for CDN

**Cost:** $10-50/month (scales with traffic)

## 🎯 Lead Quality Tips

### To Maximize Lead Value:
1. **Phone Verify** - Call leads before selling (adds 50-100% to value)
2. **Pre-Qualify** - Confirm eligibility (installers pay more)
3. **Book Appointments** - Scheduled appointments worth 2-3x more
4. **Be Exclusive** - Never sell same lead twice
5. **Fast Delivery** - Send leads within 24 hours

## 📞 Support & Maintenance

### Regular Tasks:
- **Daily:** Check new leads, update statuses
- **Weekly:** Export leads, invoice installers
- **Monthly:** Analyze conversion rates, optimize ads

### Key Metrics to Track:
- Cost per lead (CPL)
- Lead-to-sale conversion rate
- Average sale price per lead
- Return on ad spend (ROAS)
- Installer satisfaction

## ⚖️ Legal & Compliance

### GDPR Compliance:
✅ Clear consent checkbox
✅ Privacy policy link
✅ Data storage documentation
✅ Right to deletion process

### Required Policies:
- Privacy Policy
- Terms of Service
- Cookie Policy
- Data Processing Agreement (for installers)

**Templates available online** - customize for your business.

## 💡 Pro Tips

### Increase Conversion Rate:
1. Add social proof (testimonials)
2. Include trust badges
3. Show installation photos
4. Add video explainer
5. Live chat support

### Reduce Cost Per Lead:
1. A/B test landing pages
2. Improve ad copy and targeting
3. Optimize for mobile
4. Use retargeting ads
5. Build email list

### Scale Faster:
1. Partner with energy comparison sites
2. Create local landing pages for each city
3. Build calculator tools
4. Offer free guides/ebooks
5. Run webinars

## 📚 Resources

### Heat Pump Grant Information:
- Ofgem BUS Scheme: https://www.ofgem.gov.uk/environmental-and-social-schemes/boiler-upgrade-scheme-bus
- MCS Installer Directory: https://mcscertified.com
- Heat Pump Association: https://www.heatpumps.org.uk

### Marketing Tools:
- Google Ads: https://ads.google.com
- Facebook Business: https://business.facebook.com
- SEMrush (SEO): https://www.semrush.com
- Unbounce (Landing Pages): https://unbounce.com

### Lead Management:
- HubSpot CRM (Free tier)
- Pipedrive (Sales pipeline)
- Mailchimp (Email marketing)
- Calendly (Appointment booking)

## 🚨 Next Steps

1. **Set up your website** - Upload files to hosting
2. **Test thoroughly** - Complete quiz, check database
3. **Contact installers** - Send pitch emails
4. **Launch ads** - Start with small budget
5. **Monitor & optimize** - Track metrics daily
6. **Scale up** - Increase ad spend as profitable

## ❓ FAQ

**Q: How much can I really make?**
A: Realistically, expect £2,000-5,000 in the first month, scaling to £10,000-20,000+ by month 6 with proper execution.

**Q: Do I need to be MCS certified?**
A: No! You're generating leads, not installing heat pumps. You connect customers with certified installers.

**Q: Is this legal?**
A: Yes, as long as you comply with GDPR and obtain proper consent. You're providing a lead generation service.

**Q: What if installers don't pay?**
A: Use contracts, get payment upfront, or use escrow for new relationships.

**Q: How much should I spend on ads?**
A: Start with £500-1,000/month. Scale up when profitable.

## 📞 Getting Started

Ready to launch? Here's your immediate action plan:

**Today:**
- [ ] Set up hosting and domain
- [ ] Deploy this website
- [ ] Test the quiz and database

**This Week:**
- [ ] Contact 20 local installers
- [ ] Set up Google Ads account
- [ ] Create social media accounts
- [ ] Write 3 blog posts

**This Month:**
- [ ] Secure 3 installer contracts
- [ ] Launch ads with £1,000 budget
- [ ] Generate first 50 leads
- [ ] Earn first £2,000

---

**Good luck with your heat pump lead generation business! 🚀**

For technical support, consult the documentation for Express.js, SQLite, and Node.js.
