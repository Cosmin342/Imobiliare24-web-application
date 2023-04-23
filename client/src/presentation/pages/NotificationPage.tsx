import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { NotificationTable } from "@presentation/components/ui/Tables/NotificationTable/NotificationTable";

export const NotificationsPage = memo(() => {
  return <Fragment>
    <Seo title="Imobiliare24 | Notifications" />
    <WebsiteLayout>
      <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
        <ContentCard>
          <NotificationTable />
        </ContentCard>
      </Box>
    </WebsiteLayout>
  </Fragment>
});
