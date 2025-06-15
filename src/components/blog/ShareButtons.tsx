
import { toast } from 'sonner';
import { Twitter, Facebook, Linkedin, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons = ({ title, url }: ShareButtonsProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast.success('Link in die Zwischenablage kopiert!');
  };

  return (
    <Card className="mt-8">
        <CardHeader>
            <CardTitle>Artikel teilen</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex flex-wrap gap-4">
                <Button asChild variant="outline">
                    <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Twitter size={16} className="text-[#1DA1F2]" />
                        <span>Twitter</span>
                    </a>
                </Button>
                <Button asChild variant="outline">
                    <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Facebook size={16} className="text-[#4267B2]" />
                        <span>Facebook</span>
                    </a>
                </Button>
                <Button asChild variant="outline">
                    <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Linkedin size={16} className="text-[#0077B5]" />
                        <span>LinkedIn</span>
                    </a>
                </Button>
                <Button variant="outline" onClick={copyToClipboard} className="flex items-center gap-2">
                    <LinkIcon size={16} />
                    <span>Link kopieren</span>
                </Button>
            </div>
        </CardContent>
    </Card>
  );
};

export default ShareButtons;
