

# Tägliche KI-Blogartikel-Automatisierung

## Ziel
Eine Edge Function, die täglich automatisch einen neuen Blogartikel generiert, dabei bestehende Inhalte analysiert und Duplikate vermeidet.

## Ansatz

### 1. Edge Function `auto-generate-daily-post` (neue Funktion)
Erweiterte Version der bestehenden `generate-ai-blogpost`, mit folgenden Verbesserungen:

- **Duplikat-Vermeidung**: Lädt alle existierenden Slugs und Titel aus `blog_posts`, übergibt diese als Kontext an die KI mit der Anweisung "schreibe über KEINES dieser Themen"
- **Kategorie-Balancing**: Zählt Artikel pro Kategorie, wählt die Kategorie mit den wenigsten Beiträgen
- **Lovable AI Gateway** statt direktem OpenAI-Call (nutzt `LOVABLE_API_KEY`)
- **Unsplash-Titelbild** automatisch (bestehende Logik aus `generate-blog-content`)
- **Automatische Veröffentlichung** als `published`

### 2. Täglicher Cron-Job via `pg_cron` + `pg_net`
SQL-Insert in `cron.schedule` der die Edge Function täglich um 07:00 UTC aufruft.

### 3. Admin-Dashboard: Status-Anzeige
Kleiner Abschnitt auf der Admin-Seite der den letzten automatisch generierten Artikel zeigt und einen manuellen "Jetzt generieren"-Button bietet.

## Technische Details

### Edge Function Logik (Pseudocode)
```text
1. Lade alle blog_posts (slug, title, topic, published_at)
2. Zähle Artikel pro Kategorie → wähle unterrepräsentierte Kategorie
3. Baue Prompt mit Liste bestehender Titel als "NICHT schreiben über:"
4. Rufe Lovable AI Gateway (google/gemini-3-flash-preview)
5. Parse JSON-Antwort
6. Prüfe Slug-Duplikat → suffix anhängen falls nötig
7. Hole Unsplash-Bild
8. Insert in blog_posts mit status=published
```

### Neue/Geänderte Dateien
| Datei | Änderung |
|---|---|
| `supabase/functions/auto-generate-daily-post/index.ts` | Neue Edge Function |
| `supabase/config.toml` | Neue Function registrieren |
| SQL (pg_cron) | Cron-Job erstellen (via Supabase SQL Editor) |
| `src/components/admin/BlogContentGenerator.tsx` | "Auto-Pilot Status" Anzeige + manueller Trigger |

### Cron-Job
```sql
select cron.schedule(
  'daily-blog-post',
  '0 7 * * *',  -- täglich 07:00 UTC
  $$ select net.http_post(
    url:='https://bmemdtbflrmdymxqpqhs.supabase.co/functions/v1/auto-generate-daily-post',
    headers:='{"Authorization": "Bearer <anon_key>"}'::jsonb,
    body:='{}'::jsonb
  ) as request_id; $$
);
```

