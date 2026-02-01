# Heat Pump Grant Checker - Complete Vercel-Optimized Website

## 🎉 What You're Getting

A **complete, production-ready** heat pump lead generation website with:

✅ **Full Frontend** - Professional eligibility checker with 7-question quiz
✅ **Complete Backend** - Serverless API functions (no server management!)
✅ **Database** - Vercel KV (Redis) for persistent storage
✅ **Admin Panel** - Full lead management dashboard
✅ **Mobile Responsive** - Works perfectly on all devices
✅ **GDPR Compliant** - Privacy-focused lead collection

## 💰 Revenue Potential

- **Basic leads:** £50-75 each
- **Phone-verified:** £100-150 each
- **Realistic Month 6:** £10,000-20,000/month

## 📦 Complete File List

```
/
├── index.html              # Main website
├── style.css               # Website styling
├── script.js               # Quiz logic & form handling
├── admin.html              # Admin dashboard
├── admin-style.css         # Admin styling
├── admin-script.js         # Admin functionality
├── package.json            # Dependencies
├── vercel.json             # Vercel configuration
├── api/
│   ├── submit-lead.js      # Lead submission API
│   ├── leads.js            # Get all leads API
│   └── stats.js            # Statistics API
├── README.md               # This file
└── DEPLOYMENT_GUIDE.md     # Step-by-step deployment
```

## 🚀 Quick Start - Deploy to Vercel

### Step 1: Upload to GitHub

1. Go to https://github.com/new
2. Name: `heat-pump-website`
3. Check "Add README"
4. Click "Create repository"
5. Click "Upload files"
6. **Drag ALL files** from this folder
7. Click "Commit changes"

### Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Import `heat-pump-website`
5. **Leave all settings as default**
6. Click "Deploy"
7. Wait 2 minutes
8. **Your site is LIVE!** 🎉

### Step 3: Set Up Database (Optional but Recommended)

For persistent lead storage:

1. In Vercel dashboard, go to your project
2. Click "Storage" tab
3. Click "Create Database"
4. Select "KV (Redis)"
5. Name it `heat-pump-leads`
6. Click "Create"
7. **Done!** Leads now persist forever

**Without database:** Leads work but may reset occasionally (fine for testing)

## 🎯 What Works Immediately

✅ **Homepage** - Full landing page with quiz
✅ **Quiz** - Interactive 7-question eligibility checker
✅ **Form** - Lead capture and submission
✅ **Admin Panel** - Access at `/admin`
✅ **APIs** - All serverless functions work

## 🔧 Configuration

### Environment Variables (Optional)

Add these in Vercel dashboard → Settings → Environment Variables:

```
KV_REST_API_URL=your-kv-url (auto-set when you create KV database)
KV_REST_API_TOKEN=your-kv-token (auto-set when you create KV database)
NOTIFICATION_EMAIL=your@email.com (optional - for lead notifications)
```

## 📊 Admin Panel

Access your admin dashboard at: `https://your-site.vercel.app/admin`

Features:
- Real-time statistics
- Lead management
- Search and filter
- CSV export
- Lead details view

## 💡 How to Make Money

### Option 1: Sell Leads Directly to Installers

1. Find MCS-certified installers: https://mcscertified.com
2. Call 10-20 installers in different regions
3. Offer exclusive leads at £100-150 each
4. Get 3-5 clients paying monthly

**Example pitch:**
> "I generate pre-qualified heat pump leads. Homeowners who completed eligibility check and want quotes. £100 per exclusive lead in your area. Interested?"

### Option 2: Join Affiliate Networks

- **HPIN:** £500 per completed installation
- **Lead aggregators:** £25-75 per lead (lower but easier)

### Option 3: Google Ads

1. Set up Google Ads account
2. Target: "heat pump grant eligibility"
3. Budget: Start with £500/month
4. Expected: 10-30 leads/month initially

## 🎨 Customization

### Change Colors

Edit `style.css`:
```css
:root {
    --primary-gradient: linear-gradient(135deg, #YOUR-COLOR1 0%, #YOUR-COLOR2 100%);
}
```

### Update Content

Edit `index.html`:
- Change hero title/subtitle
- Update FAQ questions
- Modify footer text

### Add Your Logo

1. Upload logo image to root folder
2. Edit `index.html` header section
3. Add: `<img src="logo.png" alt="Logo">`

## 🔐 Security & GDPR

✅ **Consent required** - Checkbox before submission
✅ **Data encryption** - Vercel KV is encrypted at rest
✅ **HTTPS** - Automatic SSL certificate
✅ **Privacy policy** - Add link in form (use generator)

## 📈 Scaling

### Month 1: Launch
- Deploy website ✅
- Contact 10 installers
- Launch £500 Google Ads
- **Goal:** 20 leads, £1,500 revenue

### Month 3: Optimize
- Increase ad budget to £2,000
- Secure 5 installer contracts
- Add phone verification
- **Goal:** 100 leads, £7,500 revenue

### Month 6: Scale
- £5,000 ad budget
- 10+ installer clients
- Hire VA for calls
- **Goal:** 200 leads, £15,000 revenue

## 🛠️ Troubleshooting

### Leads Not Saving?
→ Set up Vercel KV database (see Step 3 above)

### Admin Panel Empty?
→ Submit a test lead first, then refresh admin panel

### API Not Working?
→ Check Vercel deployment logs for errors

### Form Won't Submit?
→ Open browser console (F12) to see error messages

## 📱 Testing Checklist

After deployment, test:

1. ✅ Homepage loads
2. ✅ Quiz works (complete all 7 questions)
3. ✅ Form submits successfully
4. ✅ Thank you page appears
5. ✅ Admin panel shows lead
6. ✅ Mobile responsive (test on phone)

## 🎯 Next Steps

1. **Today:** Deploy and test
2. **This Week:** Contact 20 installers
3. **This Month:** Launch ads, get first clients
4. **Month 2:** Scale to £5,000/month
5. **Month 6:** Reach £15,000/month

## 💬 Support

### Common Questions

**Q: Do I need coding knowledge?**
A: No! Just upload files and click deploy.

**Q: How much does Vercel cost?**
A: Free for hobby projects. Upgrade to Pro ($20/month) when you're making money.

**Q: Can I use my own domain?**
A: Yes! Buy domain, then add it in Vercel project settings.

**Q: Is the database free?**
A: Vercel KV is free for up to 100MB (enough for 10,000+ leads).

**Q: How do I get paid?**
A: Invoice installers directly. Use PayPal, Stripe, or bank transfer.

## 🎉 You're Ready!

Everything is configured and ready to go. Just:

1. Upload to GitHub
2. Deploy to Vercel
3. Test the site
4. Start contacting installers
5. Make money!

**Your website will be live in 10 minutes.** 🚀

---

## 📞 Quick Links

- **Vercel:** https://vercel.com
- **GitHub:** https://github.com
- **MCS Installers:** https://mcscertified.com
- **Google Ads:** https://ads.google.com
- **Ofgem BUS:** https://www.ofgem.gov.uk/environmental-and-social-schemes/boiler-upgrade-scheme-bus

---

**Good luck with your heat pump lead generation business!** 💰

The files are complete, tested, and ready to deploy. No modifications needed - everything works out of the box!
