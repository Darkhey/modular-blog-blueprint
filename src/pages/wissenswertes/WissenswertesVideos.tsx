
import VideoHub from '@/components/wissenswertes/VideoHub';
import WissenswertesLayout from '@/components/wissenswertes/WissenswertesLayout';

const WissenswertesVideos = () => {
  return (
    <WissenswertesLayout 
      title="Videos & Tutorials"
      description="Lehrreiche Videos und Schritt-für-Schritt Anleitungen von Experten"
    >
      <VideoHub />
    </WissenswertesLayout>
  );
};

export default WissenswertesVideos;
