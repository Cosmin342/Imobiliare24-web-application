import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { AnnouncementTable } from "@presentation/components/ui/Tables/AnnouncementTable/AnnouncementTable";
import { FollowedAnnouncementTable } from "@presentation/components/ui/Tables/FollowedAnnouncementTable/FollowedAnnouncementTable";

export const FollowedAnnouncementsPage = memo(() => {
  return <Fragment>
    <Seo title="Imobiliare24 | Subscriptions" />
    <WebsiteLayout>
      <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
        <ContentCard>
          <FollowedAnnouncementTable />
        </ContentCard>
      </Box>
    </WebsiteLayout>
  </Fragment>
});
