
-- Update des Türen-Artikels: Produkt-Tipps mit Amazon-Links im Artikel ergänzen (vor "Trends & Design")
UPDATE blog_posts
SET content = regexp_replace(
  content,
  '(<h3>5\. Trends & Design<\/h3>)',
  '<h3>4a. Praktische Tipps für mehr Komfort, Sicherheit und Effizienz</h3>
  <ul>
    <li>
      <strong>Hitzeschutzfolie für Fenster:</strong>
      <a href="https://www.amazon.de/Guuteee-Hitzeschutzfolie-Sonnenschutzfolie-R%C3%BCckstandslose-W%C3%A4rmeschutzfolie/dp/B0F92QV3N9?tag=klexgetier0d-21" rel="nofollow sponsored noopener" target="_blank">Jetzt auf Amazon ansehen</a> – Reduziert Wärme, schützt vor Sonne, sorgt für angenehmes Raumklima.
    </li>
    <li>
      <strong>Smart Tür- und Fenstersensor:</strong>
      <a href="https://www.amazon.de/Aqara-T%C3%BCr-Fenstersensor-Zigbee-Verbindung-Alarmanlage/dp/B07D37VDM3?tag=klexgetier0d-21" rel="nofollow sponsored noopener" target="_blank">Jetzt auf Amazon ansehen</a> – Für Einbruchschutz und smarte Benachrichtigungen, ideal für Smart-Home-Einsteiger.
    </li>
    <li>
      <strong>Elektrischer Fensteröffner:</strong>
      <a href="https://www.amazon.de/PALMAT-Elektronischer-Fenster%C3%B6ffner-Kettenantrieb-Dachfenster/dp/B0854HG9NF?tag=klexgetier0d-21" rel="nofollow sponsored noopener" target="_blank">Jetzt auf Amazon ansehen</a> – Ermöglicht automatisches Öffnen/Schließen, perfekt für schwer erreichbare Fenster oder smarte Steuerung.
    </li>
  </ul>
  <hr/>
  <h3>5. Trends & Design</h3>', 
  'g'
)
WHERE slug = 'moderne-tueren-vergleich';
