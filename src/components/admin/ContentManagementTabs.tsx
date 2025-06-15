
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, BarChart3, GitBranch } from "lucide-react";
import ContentCalendar from "./ContentCalendar";
import ScheduledPublishing from "./ScheduledPublishing";
import ContentAnalytics from "./ContentAnalytics";
import VersionControl from "./VersionControl";

interface ContentManagementTabsProps {
  selectedPostId?: string;
}

const ContentManagementTabs = ({ selectedPostId }: ContentManagementTabsProps) => {
  const [activeTab, setActiveTab] = useState("calendar");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="calendar" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Calendar
        </TabsTrigger>
        <TabsTrigger value="scheduling" className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Zeitplanung
        </TabsTrigger>
        <TabsTrigger value="analytics" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Analytics
        </TabsTrigger>
        <TabsTrigger value="versions" className="flex items-center gap-2" disabled={!selectedPostId}>
          <GitBranch className="h-4 w-4" />
          Versionen
        </TabsTrigger>
      </TabsList>

      <TabsContent value="calendar" className="mt-6">
        <ContentCalendar />
      </TabsContent>

      <TabsContent value="scheduling" className="mt-6">
        <ScheduledPublishing />
      </TabsContent>

      <TabsContent value="analytics" className="mt-6">
        <ContentAnalytics />
      </TabsContent>

      <TabsContent value="versions" className="mt-6">
        {selectedPostId ? (
          <VersionControl postId={selectedPostId} onClose={() => setActiveTab("calendar")} />
        ) : (
          <div className="text-center py-8 text-gray-500">
            Bitte wählen Sie einen Artikel aus, um die Versionshistorie anzuzeigen.
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ContentManagementTabs;
