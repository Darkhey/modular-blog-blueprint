
import CommunitySection from '@/components/wissenswertes/CommunitySection';
import WissenswertesLayout from '@/components/wissenswertes/WissenswertesLayout';

const WissenswertesCommunity = () => {
  return (
    <WissenswertesLayout 
      title="Community & Erfahrungen"
      description="Erfolgsgeschichten, Forum und Erfahrungsaustausch mit anderen Hausbesitzern"
    >
      <CommunitySection />
    </WissenswertesLayout>
  );
};

export default WissenswertesCommunity;
