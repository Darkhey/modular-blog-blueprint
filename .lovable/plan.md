# Cookie-Einstellungen & Datenschutz rechtssicher machen

Die Prüfung hat zwei Problemklassen ergeben: **technische Consent-Lücken** (Skripte laden vor Einwilligung) und **falsche Rechtstexte** (gehören zu einem anderen Projekt „Spreadshirt/Shopify").

## A. Technische Consent-Fixes (rechtlich kritisch)

### 1. `index.html` aufräumen
- **Google-AdSense-Skript** (`adsbygoogle.js`) aus dem `<head>` **entfernen**. Es wird dort ohne Einwilligung geladen und zusätzlich bereits korrekt einwilligungsabhängig per `useAdsenseLoader` nachgeladen (Doppelladung + Verstoß).
- **Google-Analytics-Skript** (`gtag/js`) aus dem `<head>` **entfernen** – es lädt aktuell ungefragt und nutzt nur die Platzhalter-ID `G-XXXXXXXXXX`.
- Den **Consent-Mode-v2-Block** (`gtag('consent','default', … denied)`) **behalten** – er ist korrekt und muss vor allem anderen stehen.

### 2. Analytics sauber deaktivieren, bis echte ID vorliegt
- In `src/config/site.config.ts` `googleServices.analytics.enabled = false` setzen (du hast „noch unklar" gewählt). So wird nichts geladen/gemessen.
- Vorbereitung für später: GA wird erst geladen, wenn (a) eine echte Mess-ID hinterlegt ist **und** (b) `analytics_storage` per Consent auf `granted` steht. Sobald du die ID hast, reicht das Eintragen der ID + `enabled: true`.

### 3. Cookie-Banner-Logik
- Der `X`-Button schließt das Banner aktuell **ohne** eine Einwilligung zu speichern → Banner erscheint bei jeder neuen Sitzung erneut und es gilt korrekt „alles abgelehnt". Das ist tolerierbar, aber sauberer: `X` entfernen bzw. wie „Nur notwendige" behandeln, damit eine bewusste Ablehnung gespeichert wird (Nachweisbarkeit der Einwilligung/Ablehnung).
- Texte im Banner an die real genutzten Dienste angleichen (Google Analytics nur erwähnen, wenn aktiv; sonst „Statistik" generisch).

### 4. Google Fonts (Empfehlung)
- `Inter` wird aktuell vom **Google-CDN** geladen → überträgt die IP der Besucher an Google noch vor jeder Einwilligung (häufiger Abmahngrund). Empfehlung: Schrift lokal über `@fontsource/inter` einbinden und den CDN-`<link>` entfernen. (Optional, aber für echte Rechtssicherheit empfohlen.)

## B. Rechtstexte neu schreiben

### 5. `src/pages/Impressum.tsx`
Mit den bestätigten Angaben:
```text
Klexgetier
Sportplatzstraße 41
84030 Ergolding
E-Mail: hallo@klexgetier.de
Telefon: 0173 6936644
```
(Die alte Delmenhorst-Adresse wird ersetzt.) Restliche Standardklauseln (Haftung, Urheberrecht, EU-OS) bleiben.

### 6. `src/pages/Datenschutz.tsx` – komplette Neufassung
Entfernt alle nicht zutreffenden Passagen (Spreadshirt/sprd.net, Shopify-Hosting, Facebook/Instagram/Pinterest-Plugins, „Registrierung mit Google", Consent-Manager-Drittanbieter) und beschreibt die **tatsächlich genutzten** Dienste:
- **Verantwortliche Stelle**: Klexgetier (Daten aus #5)
- **Hosting**: Lovable / Supabase (EU), Auftragsverarbeitung
- **Server-Logfiles**
- **Cookies & Consent Mode v2** (passend zum Banner)
- **Google AdSense** (Publisher-ID `ca-pub-4326654077043920`, einwilligungsbasiert, Art. 6 Abs. 1 lit. a)
- **Google Analytics** – als „wird ggf. eingesetzt, nur nach Einwilligung" formuliert (da derzeit deaktiviert)
- **Google Fonts** (bzw. lokales Hosting, falls #4 umgesetzt)
- **Kontaktaufnahme / Newsletter** (Supabase als Speicher)
- **Betroffenenrechte, Widerruf, Beschwerderecht, SSL/TLS**

### Geänderte Dateien
| Datei | Änderung |
|---|---|
| `index.html` | Statische GA- & AdSense-Skripte entfernt, Consent-Default behalten |
| `src/config/site.config.ts` | Analytics `enabled: false` bis echte ID |
| `src/components/ui/CookieConsent.tsx` | X-Button → bewusste Ablehnung, Texte angepasst |
| `src/pages/Impressum.tsx` | Korrekte Betreiberdaten |
| `src/pages/Datenschutz.tsx` | Vollständige Neufassung auf reale Dienste |
| optional: `src/main.tsx` + `tailwind.config.ts` | Lokale Inter-Schrift statt Google-CDN |

## Hinweis
Dies setzt die Seite technisch und inhaltlich DSGVO-/TTDSG-konform auf; es ersetzt keine anwaltliche Endprüfung. Sobald du eine echte Google-Analytics-ID hast, sage Bescheid – dann aktiviere ich GA einwilligungsbasiert.
