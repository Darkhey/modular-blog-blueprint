

# Zwei tägliche Blogartikel via Cron-Jobs

## Was wird gemacht
Der bestehende Cron-Job (einmal täglich um 07:00 UTC) wird durch **zwei Cron-Jobs** ersetzt:
- **Morgens: 07:00 UTC** (09:00 Uhr deutscher Zeit)
- **Abends: 17:00 UTC** (19:00 Uhr deutscher Zeit)

Beide rufen die bereits existierende Edge Function `auto-generate-daily-post` auf, die Duplikate vermeidet und Kategorien balanciert.

## Technische Umsetzung

### 1. Alten Cron-Job entfernen & zwei neue anlegen (SQL via Supabase)
```sql
-- Alten Job entfernen
SELECT cron.unschedule('daily-blog-post');

-- Morgen-Job (07:00 UTC)
SELECT cron.schedule(
  'daily-blog-post-morning',
  '0 7 * * *',
  $$ SELECT net.http_post(
    url:='https://bmemdtbflrmdymxqpqhs.supabase.co/functions/v1/auto-generate-daily-post',
    headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtZW1kdGJmbHJtZHlteHFwcWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MjUzNTIsImV4cCI6MjA2NTUwMTM1Mn0.fs1wAnmkGCGD7tbMpqot7sqFqYpLYuDzwCiYT32USTY"}'::jsonb,
    body:='{}'::jsonb
  ) AS request_id; $$
);

-- Abend-Job (17:00 UTC)
SELECT cron.schedule(
  'daily-blog-post-evening',
  '0 17 * * *',
  $$ SELECT net.http_post(
    url:='https://bmemdtbflrmdymxqpqhs.supabase.co/functions/v1/auto-generate-daily-post',
    headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtZW1kdGJmbHJtZHlteHFwcWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MjUzNTIsImV4cCI6MjA2NTUwMTM1Mn0.fs1wAnmkGCGD7tbMpqot7sqFqYpLYuDzwCiYT32USTY"}'::jsonb,
    body:='{}'::jsonb
  ) AS request_id; $$
);
```

### 2. Admin-UI aktualisieren
- **AutoPilotStatus.tsx**: Badge-Text von "Täglich 07:00 UTC" auf "Täglich 07:00 & 17:00 UTC" ändern

### Dateien
| Datei | Änderung |
|---|---|
| SQL (via Supabase SQL Editor) | Alten Job löschen, zwei neue anlegen |
| `src/components/admin/AutoPilotStatus.tsx` | Badge-Text aktualisieren |

Die Edge Function selbst bleibt unverändert -- sie prüft bereits bestehende Titel und Slugs bei jedem Aufruf, sodass auch bei zwei Aufrufen am Tag keine Duplikate entstehen.

