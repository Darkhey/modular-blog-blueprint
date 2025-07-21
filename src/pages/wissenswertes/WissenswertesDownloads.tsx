
import DownloadCenter from '@/components/wissenswertes/DownloadCenter';
import WissenswertesLayout from '@/components/wissenswertes/WissenswertesLayout';

const WissenswertesDownloads = () => {
  return (
    <WissenswertesLayout 
      title="Downloads & Checklisten"
      description="Kostenlose PDFs, Excel-Vorlagen und Checklisten für Ihr Sanierungsprojekt"
    >
      <DownloadCenter />
    </WissenswertesLayout>
  );
};

export default WissenswertesDownloads;
