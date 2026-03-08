

## Plan: Helfer-Chatbot mit automatischer Artikelgenerierung

### Übersicht

Ein schwebendes Chat-Widget (unten rechts) ermöglicht Besuchern, Fragen zu Sanierung, Heizung, Dämmung etc. zu stellen. Der Bot:
1. Durchsucht bestehende Blog-Artikel und schlägt passende vor
2. Beantwortet Fragen kontextbezogen (z.B. Handwerkersuche)
3. Generiert automatisch einen neuen Artikel, wenn kein passender existiert, und verlinkt ihn direkt

### Architektur

```text
┌─────────────────────┐
│  ChatWidget (UI)    │ ← Floating Button + Chat-Panel
│  - Nachrichten      │
│  - Streaming        │
└────────┬────────────┘
         │ supabase.functions.invoke('chat-assistant')
         ▼
┌─────────────────────────────┐
│  Edge Function              │
│  chat-assistant/index.ts    │
│                             │
│  1. Blog-Posts durchsuchen  │  ← SELECT from blog_posts (title, slug, excerpt)
│  2. OpenAI Prompt bauen     │  ← Kontext: gefundene Artikel + User-Frage
│  3. Antwort streamen        │
│  4. Falls "kein Artikel":   │
│     → generate-blog-content │  ← Bestehende Edge Function aufrufen
│     → Neuen Slug zurückgeben│
└─────────────────────────────┘
```

### Komponenten

#### 1. Edge Function: `supabase/functions/chat-assistant/index.ts`
- Empfängt `{ message, history }` vom Client
- Sucht in `blog_posts` nach relevanten Artikeln (ILIKE auf title, excerpt, keywords)
- Baut einen System-Prompt mit den gefundenen Artikeln als Kontext
- Nutzt OpenAI (bereits als Secret vorhanden) für die Antwort
- Wenn der Bot erkennt, dass kein passender Artikel existiert, ruft er intern `generate-blog-content` auf und gibt den neuen Slug in der Antwort zurück
- Streaming-Response (SSE) für flüssige UX

#### 2. React-Komponente: `src/components/chat/ChatWidget.tsx`
- Floating Action Button (unten rechts, über dem Sticky-Banner)
- Aufklappbares Chat-Panel mit:
  - Nachrichtenverlauf (User + Bot)
  - Eingabefeld
  - Markdown-Rendering für Bot-Antworten
  - Klickbare Artikel-Links innerhalb der Antworten
- Streaming-Darstellung (Token für Token)
- Vorschläge als Quick-Action-Chips ("Handwerker finden", "Fördermittel", "Dämmung")

#### 3. Integration in `App.tsx`
- ChatWidget wird global eingebunden (vor dem Footer)

### Technische Details

- **Artikelsuche**: SQL-Query mit `ilike` auf title/excerpt + `@>` auf keywords-Array
- **Prompt-Strategie**: System-Prompt enthält bis zu 10 relevante Artikel (Titel + Slug + Excerpt), Bot soll diese als Markdown-Links einbauen
- **Artikelgenerierung**: Wenn OpenAI antwortet, dass kein passender Artikel vorhanden ist, wird per Tool-Call oder speziellem JSON-Tag die Generierung ausgelöst
- **Config**: `verify_jwt = false` für den neuen Endpoint (öffentlich zugänglich für Besucher)
- **Rate Limiting**: Max 10 Nachrichten pro Session (clientseitig)

