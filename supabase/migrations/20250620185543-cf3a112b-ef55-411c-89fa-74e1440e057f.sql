
-- Vereinheitlichung der Topic-Namen in blog_posts entsprechend der site.config.ts

-- Aktualisiere alle Heizung-bezogenen Posts
UPDATE blog_posts 
SET topic = 'Heizung modernisieren'
WHERE topic IN ('Heizung', 'Heizung Modernisierung', 'Heizungstechnik', 'Heizung modernisieren');

-- Aktualisiere alle Dämmung-bezogenen Posts
UPDATE blog_posts 
SET topic = 'Dämmung & Isolierung'
WHERE topic IN ('Dämmung', 'Isolierung', 'Wärmedämmung', 'Dachdämmung', 'Dämmung & Isolierung');

-- Aktualisiere alle Solar-bezogenen Posts
UPDATE blog_posts 
SET topic = 'Solarenergie'
WHERE topic IN ('Solar', 'Photovoltaik', 'Solarthermie', 'PV-Anlage', 'Solarenergie');

-- Aktualisiere alle Fenster-bezogenen Posts
UPDATE blog_posts 
SET topic = 'Fenster & Türen'
WHERE topic IN ('Fenster', 'Türen', 'Verglasung', 'Fenster & Türen');

-- Aktualisiere alle Smart Home-bezogenen Posts
UPDATE blog_posts 
SET topic = 'Smart Home'
WHERE topic IN ('Smart Home', 'Hausautomation', 'Intelligente Haustechnik');

-- Überprüfe, welche Topics noch nicht zugeordnet sind
SELECT DISTINCT topic FROM blog_posts 
WHERE topic NOT IN (
  'Heizung modernisieren',
  'Dämmung & Isolierung', 
  'Fördermittel',
  'Fenster & Türen',
  'Solarenergie',
  'Smart Home'
);
