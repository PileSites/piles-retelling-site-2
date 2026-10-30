# PILES RETELLING website

A lightweight, responsive multi-page website built with semantic HTML, CSS and vanilla JavaScript. It has no build step or runtime package dependencies.

## Run locally

Open `index.html` in a browser, or serve this directory with any static web server. For example, from this folder:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Pages

- `index.html` — homepage and interactive process diagram
- `about.html` — company, mission and vision
- `services.html` — capabilities and inquiry links
- `ventures.html` — venture-building approach and initiatives
- `projects.html` — filterable project portfolio
- `insights.html` — editorial landing page, ready for published articles
- `contact.html` — contact details and email-preparation form

## Updating company information

Edit `config.js` to update the company name, contact details, website, tagline and brand color tokens. Search for corresponding static values in the HTML when updating visible labels or search metadata. Project and initiative text is intentionally explicit about unconfirmed details; replace it only with verified information.

## Contact form behavior

The form performs browser validation and opens the visitor's default email application with the inquiry prepared. It does not submit to a server, store data or send email itself. A backend or email service must be configured for direct submission.

## Deployment

Deploy the files in this directory to any static hosting provider. Configure the custom domain `pilesretelling.com` and HTTPS in the hosting provider, and keep `robots.txt` and `sitemap.xml` available at the site root.

The site uses Manrope and DM Mono from Google Fonts when available; local sans-serif and monospace fallbacks are provided.
