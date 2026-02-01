# 🚀 Quick Start Guide

## Immediate Actions (Next 30 Minutes)

### Step 1: Test Locally

1. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org
   - Choose LTS version (v20.x or higher)

2. **Install Dependencies:**
   ```bash
   cd [your-project-folder]
   npm install
   ```

3. **Start the Server:**
   ```bash
   npm start
   ```

4. **Test Your Website:**
   - Open: http://localhost:3000
   - Complete the quiz
   - Check admin panel: http://localhost:3000/admin

### Step 2: Deploy to Production (Choose One)

#### Option A: Heroku (Easiest - 10 minutes)

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Deploy
git init
git add .
git commit -m "Initial commit"
git push heroku main

# Open your site
heroku open
```

**Cost:** Free tier available, $7/month for hobby tier

#### Option B: DigitalOcean (Best Value - 20 minutes)

1. Create account at digitalocean.com
2. Create a Droplet (Ubuntu 22.04)
3. SSH into server
4. Install Node.js:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
5. Upload files and install:
   ```bash
   npm install
   npm install -g pm2
   pm2 start server.js
   pm2 save
   pm2 startup
   ```
6. Point domain to droplet IP

**Cost:** $6/month

### Step 3: Get Your First Lead (Today!)

1. **Contact 5 Local Installers:**
   - Google: "MCS heat pump installer [your city]"
   - Call them: "Hi, I generate heat pump leads. Want 5 free trial leads?"
   - Get at least 2 interested

2. **Launch Small Google Ads Campaign:**
   - Budget: £50
   - Target: "heat pump grant eligibility"
   - Location: Your city
   - Send traffic to your site

3. **Share on Social Media:**
   - Post on local Facebook groups
   - Share on LinkedIn
   - Tag #HeatPumpGrant #BoilerUpgradeScheme

### Step 4: First £1,000 (This Week)

**Day 1 (Today):**
- [x] Deploy website
- [x] Test thoroughly
- [ ] Contact 10 installers
- [ ] Get 2 agreements

**Day 2-3:**
- [ ] Launch £100 Google Ads test
- [ ] Post in 10 local Facebook groups
- [ ] Generate first 5 leads
- [ ] Send to installers

**Day 4-5:**
- [ ] Collect feedback from installers
- [ ] Invoice for leads (£60 × 5 = £300)
- [ ] Optimize landing page
- [ ] Scale ads to £200

**Day 6-7:**
- [ ] Generate 10-15 more leads
- [ ] Second invoice (£60 × 10 = £600)
- [ ] Write 2 blog posts
- [ ] Plan next week

**Week 1 Target:** £900-1,200 revenue

## Common Issues & Solutions

### Issue: Database Not Working
**Solution:** The database is created automatically. If you see errors:
```bash
rm leads.db
npm start
# Database will be recreated
```

### Issue: Port Already in Use
**Solution:** Change the port in server.js:
```javascript
const PORT = 3001; // Change from 3000
```

### Issue: Leads Not Saving
**Solution:** Check browser console (F12) for errors. Ensure:
- Server is running
- Network requests are successful
- Form validation passes

### Issue: Can't Access Admin Panel
**Solution:** Make sure:
- Server is running
- Navigate to: http://localhost:3000/admin
- Clear browser cache if needed

## Next Steps

1. **Get Domain Name:**
   - Suggestions: heatpumpgrantchecker.co.uk, ukgrantschecker.co.uk
   - Buy from: Namecheap, GoDaddy, or Google Domains
   - Cost: £10-20/year

2. **Set Up Email:**
   - Use: Google Workspace or Zoho Mail
   - Create: contact@yourdomain.com
   - Cost: £5-10/month

3. **Add Analytics:**
   - Google Analytics: Free tracking
   - Facebook Pixel: For retargeting
   - Hotjar: See how people use your site

4. **Legal Pages:**
   - Privacy Policy: Use generator at privacypolicygenerator.info
   - Terms of Service: Use template from termsfeed.com
   - Cookie Policy: Use cookiepolicygenerator.com

## Pro Tips for First Week

1. **Start Small:** Don't spend £1,000 on ads immediately. Test with £50-100.

2. **Quality > Quantity:** 10 great leads worth £100 each = £1,000. Better than 100 bad leads worth £20.

3. **Build Relationships:** The installers who pay you regularly are more valuable than one-time buyers.

4. **Track Everything:** Use a spreadsheet to track:
   - Leads generated (date, source, cost)
   - Leads sold (installer, price, paid?)
   - ROI per channel

5. **Respond Fast:** Text/email leads to installers within 1 hour. They pay more for fresh leads.

## Week 2-4 Checklist

### Week 2: Optimize
- [ ] Analyze first week data
- [ ] Improve conversion rate (A/B test headlines)
- [ ] Add testimonials from installers
- [ ] Create FAQ page
- [ ] Launch retargeting ads

### Week 3: Scale
- [ ] Increase ad budget 2x
- [ ] Contact 20 more installers
- [ ] Create 3 city-specific landing pages
- [ ] Start email newsletter
- [ ] Guest post on 2 blogs

### Week 4: Systematize
- [ ] Create installer onboarding document
- [ ] Set up automated invoicing
- [ ] Hire VA for phone verification
- [ ] Build affiliate tracking system
- [ ] Plan month 2 strategy

## Your 90-Day Milestones

**Day 30:** £5,000 revenue, 3 regular installer clients
**Day 60:** £10,000 revenue, 8 installer clients, profitable on ads
**Day 90:** £15,000 revenue, 15 installer clients, hiring help

## Support & Community

### If You Get Stuck:
1. Re-read the README.md (comprehensive guide)
2. Check BUSINESS_PLAN.md (strategy details)
3. Google your specific error message
4. Check Express.js, SQLite, Node.js documentation

### Keep Learning:
- Google Ads: skillshop.withgoogle.com
- Facebook Ads: facebook.com/business/learn
- SEO: moz.com/beginners-guide-to-seo
- Landing Pages: unbounce.com/landing-page-articles

## Emergency Contacts

If you need immediate help with heat pump grants:
- Ofgem: 0207 901 7000
- MCS: 0333 103 8130
- Citizens Advice: 0800 144 8848

For business registration:
- Companies House: gov.uk/government/organisations/companies-house
- HMRC: gov.uk/government/organisations/hm-revenue-customs

---

**You've got this! 💪**

Remember: Every successful business started exactly where you are now. The difference is they took action.

Your first lead could come today. Your first £1,000 week could be next week. Your first £10,000 month could be in 3 months.

But only if you start NOW.

**Launch your site. Contact installers. Generate leads. Make money. 🚀**
