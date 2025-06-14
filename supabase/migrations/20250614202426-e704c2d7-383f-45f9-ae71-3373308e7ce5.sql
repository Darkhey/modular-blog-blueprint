
CREATE TABLE public.newsletter_subscriptions (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    email text NOT NULL UNIQUE,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Row Level Security aktivieren
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Richtlinie: Jeder darf sich neu anmelden (INSERT)
CREATE POLICY "Allow public insert for new subscriptions"
ON public.newsletter_subscriptions
FOR INSERT
WITH CHECK (true);

-- Richtlinie: Das Auslesen der E-Mail-Adressen wird unterbunden
CREATE POLICY "Disallow reading subscriptions"
ON public.newsletter_subscriptions
FOR SELECT
USING (false);

-- Richtlinie: Das Aktualisieren wird unterbunden
CREATE POLICY "Disallow updating subscriptions"
ON public.newsletter_subscriptions
FOR UPDATE
USING (false);

-- Richtlinie: Das Löschen wird unterbunden
CREATE POLICY "Disallow deleting subscriptions"
ON public.newsletter_subscriptions
FOR DELETE
USING (false);

