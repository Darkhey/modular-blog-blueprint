
import InteractiveTools from '@/components/wissenswertes/InteractiveTools';
import WissenswertesLayout from '@/components/wissenswertes/WissenswertesLayout';

const WissenswertesTools = () => {
  return (
    <WissenswertesLayout 
      title="Rechner & Tools"
      description="Interaktive Berechnungstools für Kosten, Einsparungen und Planungshilfen"
    >
      <InteractiveTools />
    </WissenswertesLayout>
  );
};

export default WissenswertesTools;
