
import EnergyAdvisorSearch from '@/components/shared/EnergyAdvisorSearch';
import InsulationManufacturers from '@/components/manufacturers/InsulationManufacturers';
import WissenswertesLayout from '@/components/wissenswertes/WissenswertesLayout';

const WissenswertesExperten = () => {
  return (
    <WissenswertesLayout 
      title="Hersteller & Experten"
      description="Energieberater-Suche, Hersteller-Verzeichnis und Fachbetriebe-Finder"
    >
      <div className="space-y-16">
        <EnergyAdvisorSearch />
        <InsulationManufacturers />
      </div>
    </WissenswertesLayout>
  );
};

export default WissenswertesExperten;
