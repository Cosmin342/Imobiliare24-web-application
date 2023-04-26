import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Fragment, memo } from "react";
import { useIntl } from "react-intl";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { AppRoute } from "routes";

export const HomePage = memo(() => {
  const { formatMessage } = useIntl();

  return (
    <Fragment>
      <Seo title="Imobiliare24 | Home" />
      <WebsiteLayout>
        <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
          <ContentCard>
            <div className="HomePage_container">
              <h1>Imobiliare24</h1>
              <br />
              <ApartmentIcon style={{ color: "white" }} fontSize="large" />
              {formatMessage({ id: "globals.descriptionSite" })}
              <br />
              {formatMessage({ id: "globals.loginMessage" })}
              <br />
              <br />
              <br />
              <Grid container item direction="row" xs={12} columnSpacing={4}>
                <Grid container item direction="column" xs={6} md={6}>
                  <Button variant="outlined" color="primary">
                    {" "}
                    {/* If the user is not logged in show a button that redirects to the login page. */}
                    <Link to={AppRoute.Login}>
                      {formatMessage({ id: "globals.login" })}
                    </Link>
                  </Button>
                </Grid>
                <Grid container item direction="column" xs={6} md={6}>
                  <Button variant="outlined" color="primary">
                    {" "}
                    {/* If the user is not logged in show a button that redirects to the login page. */}
                    <Link to={AppRoute.SignUp}>
                      {formatMessage({ id: "globals.signup" })}
                    </Link>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </ContentCard>
        </Box>
      </WebsiteLayout>
    </Fragment>
  );
});
