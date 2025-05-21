-- Add is_public column to playlists table
ALTER TABLE playlists
ADD COLUMN is_public BOOLEAN DEFAULT false NOT NULL;

-- Add slug column to playlists table
ALTER TABLE playlists
ADD COLUMN slug VARCHAR(255) NULL;

-- Add unique constraint for the slug column
ALTER TABLE playlists
ADD CONSTRAINT unique_slug UNIQUE (slug);
