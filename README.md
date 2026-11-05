# Elegant mobile wedding invitation · GitHub Pages

A complete responsive wedding invitation in Azerbaijani. HTML/CSS/JS, no hosting fees, database, build tools, or npm needed.

## Personalize

1. Open **config.js** and replace the DEMO names, date, time, venue, hall, and address with real details.
2. For WhatsApp RSVP enter the phone in international format, digits only: `994501234567` (example only). Without a configured phone, RSVP displays a reminder and does NOT send anything.
3. Optional: create an `assets` folder, add `couple.jpg` and/or `music.mp3`; configure `photoFile: 'assets/couple.jpg'`, `musicFile: 'assets/music.mp3'` in config.js. Music should be yours or properly licensed and starts only when user taps the music button.
4. Edit the schedule in `config.js`, if needed.
5. Optional: change theme colors in `style.css` (`:root`).

## Publish to GitHub Pages

1. Sign in at github.com and create a new **public** repository, e.g. `wedding-invite`.
2. Use **Add file → Upload files** and upload **index.html, style.css, script.js, config.js** (and optional `assets` directory).
3. Commit changes.
4. Open **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, select **main**, folder **/(root)**, click **Save**.
5. Your site URL will be `https://YOUR_USERNAME.github.io/wedding-invite/`. It may take several minutes to become available.
6. Test it on a phone, including the venue map and the WhatsApp RSVP link.

## Notes
- Your example site was used as a functional reference; this is an original design, not a copy of its source.
- Date countdown uses the configured time-zone offset. For Azerbaijan, leave `+04:00`.
- RSVP is WhatsApp-based, so you do not need a database. The guest must confirm sending inside WhatsApp.
- Images/music are not included because those are personal/licensed assets.
- Google Fonts and Google Maps need an internet connection.
