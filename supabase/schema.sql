-- Apply this migration in the intended Supabase project before configuring form submissions.
-- Reapplying it creates any missing check constraints and repeats the same grants safely.
-- Existing rows that violate a new constraint must be reviewed and corrected before ALTER TABLE can succeed.
begin;

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text not null,
  course_slug text not null,
  education_level text,
  preferred_format text,
  preferred_contact_method text,
  message text
);

-- Add constraints by name so this also upgrades the earlier unconstrained demo table.
do $$
begin
  if not exists (select 1 from pg_constraint where conrelid = 'public.enquiries'::regclass and conname = 'enquiries_full_name_length') then
    alter table public.enquiries add constraint enquiries_full_name_length
      check (char_length(btrim(full_name)) between 2 and 100);
  end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.enquiries'::regclass and conname = 'enquiries_email_length') then
    alter table public.enquiries add constraint enquiries_email_length
      check (char_length(btrim(email)) between 3 and 254);
  end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.enquiries'::regclass and conname = 'enquiries_phone_format') then
    alter table public.enquiries add constraint enquiries_phone_format
      check (char_length(btrim(phone)) between 7 and 24 and btrim(phone) ~ '^[+()0-9 .-]+$');
  end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.enquiries'::regclass and conname = 'enquiries_course_slug_format') then
    alter table public.enquiries add constraint enquiries_course_slug_format
      check (char_length(course_slug) between 1 and 100 and course_slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$');
  end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.enquiries'::regclass and conname = 'enquiries_education_level_length') then
    alter table public.enquiries add constraint enquiries_education_level_length
      check (education_level is null or char_length(btrim(education_level)) <= 80);
  end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.enquiries'::regclass and conname = 'enquiries_preferred_format_allowed') then
    alter table public.enquiries add constraint enquiries_preferred_format_allowed
      check (preferred_format is null or preferred_format in ('in-person', 'online', 'hybrid'));
  end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.enquiries'::regclass and conname = 'enquiries_preferred_contact_allowed') then
    alter table public.enquiries add constraint enquiries_preferred_contact_allowed
      check (preferred_contact_method is null or preferred_contact_method in ('email', 'phone', 'whatsapp'));
  end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.enquiries'::regclass and conname = 'enquiries_message_length') then
    alter table public.enquiries add constraint enquiries_message_length
      check (message is null or char_length(btrim(message)) <= 1200);
  end if;
end
$$;

alter table public.enquiries enable row level security;

-- The app writes only from its trusted Node API route with a server-side service-role key.
-- RLS is enabled with no public policies. Remove direct/default API table grants, then give
-- the service role only what this form needs: insert form fields and return id/timestamp.
revoke all on table public.enquiries from public, anon, authenticated, service_role;
grant usage on schema public to service_role;
grant insert (full_name, email, phone, course_slug, education_level, preferred_format, preferred_contact_method, message)
  on table public.enquiries to service_role;
grant select (id, created_at) on table public.enquiries to service_role;

commit;
