const linkedArticles = new Set([
  'einblasdaemmung-fachbetrieb-einbaudichte-qualitaet',
  'thermofloc-zellulosedaemmung-technik-einsatzbereiche',
]);

export function withEditorialRelatedLink(slug: string, content: string): string {
  const path = '/blog/in-eigener-sache-handwerker-online-erkennen';
  if (!linkedArticles.has(slug) || content.includes(path)) return content;
  return `${content}<h2>Den passenden Fachbetrieb auswählen</h2><p>Technische Nachweise sind wichtig, doch auch Referenzen und klare Absprachen helfen bei der Auswahl. In meinem Beitrag <a href="${path}">wie Sie einen Handwerksbetrieb online einschätzen können</a> finden Sie eine Checkliste für den ersten Kontakt und einen transparenten Blick hinter diesen Blog.</p>`;
}