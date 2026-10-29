# LISTEN — Stories That Don't Let You Sleep

A dark, mobile-first horror story PWA starter built with Next.js 14 App Router, Tailwind CSS, Firebase Auth/Firestore/Storage, and Vercel. It includes demo cover art, story browsing, category filtering, a read-along player, playback speed, sleep timer, favorites, login UI, admin upload UI, and payment endpoint placeholders.

## Important before launch

This is a deployable **starter**, not a completed commercial billing system. The M-Pesa and PayPal endpoints deliberately return a placeholder response; real payments must not be accepted until OAuth/order creation, callback/webhook verification, idempotency, and server-side subscription entitlements are implemented and tested. The current UI does not enforce “one story per day” or Premium access server-side. Do not advertise these as secure billing features until you add those checks.

Background audio is handled by the browser's native `<audio>` element. Most mobile browsers allow ongoing audio with the screen locked after playback starts, but browser/OS settings can interrupt it. The service worker intentionally does not cache audio files.

## Folder structure

```text
listen-horror-app/
├── app/
│   ├── account/page.tsx
│   ├── admin/page.tsx
│   ├── api/
│   │   ├── mpesa/callback/route.ts
│   │   ├── mpesa/stkpush/route.ts
│   │   └── paypal/create-order/route.ts
│   ├── favorites/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── login/page.tsx
│   ├── page.tsx
│   ├── story/[id]/page.tsx
│   └── subscribe/page.tsx
├── components/
│   ├── AuthProvider.tsx
│   ├── Header.tsx
│   ├── PWARegister.tsx
│   ├── SearchStories.tsx
│   ├── StoryCard.tsx
│   └── StoryPlayer.tsx
├── lib/
│   ├── firebase.ts
│   ├── stories.ts
│   └── user-data.ts
├── public/
│   ├── covers/
│   ├── icon.svg
│   ├── manifest.json
│   └── sw.js
├── .env.example
├── firestore.rules
├── storage.rules
├── vercel.json
└── README.md
```

## 3-step deploy (GitHub + Vercel)

### 1. Configure Firebase
1. Create a Firebase project at https://console.firebase.google.com/ (Spark/free plan to start).
2. Enable **Authentication → Google** and **Phone** providers. For Phone Auth, configure allowed domains and test phone numbers; SMS delivery may have quotas or costs.
3. Create a **Firestore Database** and enable **Storage**. Paste `firestore.rules` and `storage.rules` into the Firebase console, replacing `you@example.com` with your admin Google account email in both files. For production, migrate the admin allowlist to Firebase custom claims.
4. Register a Firebase Web App and copy its public config into `.env.local` (copy `.env.example` first). `NEXT_PUBLIC_ADMIN_EMAILS` is used by the UI only; security rules are the actual enforcement.

### 2. Push to GitHub
```bash
npm install
cp .env.example .env.local
# Fill in Firebase values in .env.local
npm run dev
# Test at http://localhost:3000
git init
git add .
git commit -m "Build LISTEN horror story app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/listen-horror-app.git
git push -u origin main
```
Never commit `.env.local` or real secrets.

### 3. Deploy with Vercel
1. Import the GitHub repository at https://vercel.com/new.
2. Add the same `NEXT_PUBLIC_FIREBASE_*` values and `NEXT_PUBLIC_ADMIN_EMAILS` under **Project Settings → Environment Variables**. Add Daraja/PayPal server secrets only when ready to implement those integrations.
3. Deploy. Add your Vercel domain to Firebase Authentication authorized domains. Test sign-in, story loading, uploads, and mobile playback.

## Run locally
```bash
npm install
cp .env.example .env.local
npm run dev
```
Visit `http://localhost:3000`. For a production build run `npm run build`.

## Adding stories without code
1. Sign in with the admin Google account.
2. Open `/admin`.
3. Add title, category, cover, audio, and full text, then upload.

The admin page currently uses a client-side email check for display plus Firestore/Storage rules for security. Keep the rules' admin email aligned with your account.

## Firebase data model

- `stories/{storyId}`: title, category, description, text, coverUrl, audioUrl, premium, createdAt, createdBy
- `users/{uid}/favorites/{storyId}`: storyId, createdAt
- `subscriptions/{uid}`: reserved for server-verified subscription state; client writes are denied by the provided rules.

## PWA notes
`public/manifest.json`, `public/icon.svg`, and `public/sw.js` provide install metadata and a minimal app-shell cache. Installability and service-worker behavior require HTTPS (Vercel provides HTTPS) or localhost. This lightweight service worker does not cache user-specific data, API responses, or audio.

## Low-budget notes
Next.js, Tailwind, and Firebase have free starting tiers subject to quotas and policy changes. Firebase Phone Auth/SMS, Storage bandwidth, Firestore usage, and large audio traffic can exceed free limits. Compress audio (e.g. mono MP3 at 64–96 kbps for spoken stories), use sensible file sizes, and check Firebase billing/quotas. Do not put service-account credentials or Daraja/PayPal secrets in `NEXT_PUBLIC_*` variables.

## Limitations / production checklist
- [ ] Implement server-side daily free-story limit and premium entitlements.
- [ ] Implement real M-Pesa Daraja STK Push + callback verification.
- [ ] Implement PayPal Orders API + capture/webhook verification.
- [ ] Protect admin operations with Firebase custom claims or a trusted server-side authorization check.
- [ ] Add file type/size validation and upload progress; consider resumable uploads for large audio.
- [ ] Add legal/privacy/terms pages and clear subscription renewal/cancellation terms.
- [ ] Test Android Chrome, iOS Safari, and screen-lock audio on real devices.
