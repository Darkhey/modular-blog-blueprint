
-- 1. Nutzerprofile-Tabelle anlegen
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique,
  avatar_url text,
  role text default 'user', -- Optional: "user", "admin", "moderator" etc.
  created_at timestamp with time zone default now()
);

-- Trigger-Funktion: Füllt `profiles` bei neuer User-Registrierung automatisch
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger setzen
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- (Optional) Erweiterung: Index für schnelle Benutzersuche
create index if not exists idx_profiles_username on public.profiles (lower(username));
