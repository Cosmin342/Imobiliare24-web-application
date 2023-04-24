import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { AnnouncementTable } from "@presentation/components/ui/Tables/AnnouncementTable/AnnouncementTable";

export const AnnouncementsPage = memo(() => {
  return <Fragment>
    <Seo title="Imobiliare24 | Announcements" />
    <WebsiteLayout>
      <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
        <ContentCard>
          <AnnouncementTable />
        </ContentCard>
      </Box>
    </WebsiteLayout>
  </Fragment>
});
