
import { siteConfig } from '@/config/site.config';

interface AdSlotProps {
  position: 'banner' | 'sidebar' | 'footer';
  className?: string;
}

const AdSlot = ({ position, className = '' }: AdSlotProps) => {
  if (!siteConfig.adsEnabled) return null;

  const getAdCode = () => {
    switch (position) {
      case 'banner':
        return siteConfig.adsSettings.adCodes.banner;
      case 'sidebar':
        return siteConfig.adsSettings.adCodes.sidebar;
      case 'footer':
        return siteConfig.adsSettings.adCodes.footer;
      default:
        return '';
    }
  };

  return (
    <div className={`ad-slot ${className}`}>
      <div dangerouslySetInnerHTML={{ __html: getAdCode() }} />
    </div>
  );
};

export default AdSlot;
