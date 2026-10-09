# AWS Student Builder Group PICT — Cloud City 2027 🌐🏙️

A modern, high-converting, professional event landing page for **"AWS Student Builder Group PICT — Cloud City 2027"**, held at **Dakkhan Banquet Hall, Ambegoan | Katraj | Nahre, Pune** on **31st January 2027**.

---

## 🌟 Visual Theme & Design Concept

- **Theme Concept:** **Cloud City** — Inspired by futuristic tech architecture, server-rack skylines with warm glowing window lights, circuit branches, and the AWS SBG castellated chip motif.
- **Visual Aesthetic:**
  - Modern tech palette with deep AWS Navy (`#080E1B` / `#0D1B2A`), Tech Purple accents, and glowing warm amber/gold elements (`#FF9900` / `#FFC72C`).
  - **Interactive Canvas Skyline (`CitySkylineCanvas.tsx`):** Animated server rack buildings with glowing window LEDs, circuit lines on building facades, wifi antennas, and floating purple SBG logos.
  - **Glassmorphism:** Frosted translucent panels (`backdrop-filter: blur()`).

---

## 🧱 Key Components & Updates

1. **Sticky Navigation Bar (`Navbar.tsx` & `SBGLogo.tsx`):**
   - Official AWS smile + AWS Student Builder Group PICT logo.
   - Navigation links: `Home`, `About`, `Agenda`, `Tickets`, `Sponsors`, `Venue`.
   - Glowing "Register Now" CTA with confetti celebration.
   - Fully responsive mobile drawer.

2. **Hero Section (`HeroSection.tsx`):**
   - Clean, high-impact design matching the reference image.
   - Headline: **COMMUNITY DAY — CLOUD CITY 2027**.
   - Subtitle: *Organized by AWS Student Builder Group • Pune Institute of Computer Technology*.
   - Event Date & Venue: **31st Jan 2027** | **Dakkhan Banquet Hall | Ambegoan | Katraj | Nahre, Pune**.
   - Precise live countdown timer to Jan 31, 2027.
   - Primary Call-to-Action button: **Register Now →**.

3. **Photo Slideshow (`MarqueeCarousel.tsx`):**
   - Infinite horizontal rolling continuous carousel.
   - **Pure photos only** — no cluttered text, metadata blocks, or locations. Clean cards with smooth hover zoom and subtle glowing borders.

4. **About Section (`AboutSection.tsx`):**
   - Title: *Where Cloud Infrastructure Meets Urban Architectural Scale*.
   - Customized copy:
     > *"Fellow cloud citizens! Step into an immersive tech metropolis where cloud comes to life. Designed to bridge the gap between classroom theory and real-world innovation, this event transforms learning into an interactive urban experience. Whether you are exploring expert-led sessions, tackling interactive challenges, or connecting with fellow builders and industry peers, every corner is engineered to help you learn, build, and grow. Connect with fellow builders and discover real skills, real conversations, and real opportunities."*
   - Interactive pillars: **Learn**, **Build**, **Grow**, **Connect**.

5. **Agenda Section in Teaser Mode (`AgendaSection.tsx`):**
   - Frosted glass blurred schedule container (`backdrop-filter: blur(10px)`).
   - Prominent central badge: **"🔒 Agenda Coming Soon — Stay Tuned!"** with subtle pulse animation.
   - Clean and distraction-free (no email capture or sneak peek toggles).

6. **Book Tickets Section (`TicketPassesSection.tsx`):**
   - Exactly 4 pass blocks in Indian Rupee (₹):
     1. **Super Early Bird — ₹199**
     2. **Early Bird — ₹299**
     3. **General — ₹399**
     4. **Group Discount — ₹249** *(for teams of 3+)*
   - Open to all attendees without SBG membership requirements.

7. **Venue Section (`VenueSection.tsx`):**
   - Dedicated card for **Dakkhan Banquet Hall, Ambegoan | Katraj | Nahre, Pune** with Google Maps directions button.

8. **Speakers & Sponsors Spotlight Grid (`SpotlightSection.tsx`):**
   - Grid layout of speakers and tiered sponsor logos.

9. **Fixed Social Media Sidebar (`SocialSidebar.tsx`):**
   - Floating vertically on the right with glowing warm yellow hover effects for LinkedIn, Instagram, Twitter/X, Discord, and GitHub.

10. **Footer (`Footer.tsx`):**
    - AWS SBG PICT branding, copyright 2027, quick links, and official community disclaimer.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build for production
npm run build

# Preview build locally
npm run preview
```
