import queryString from "query-string";

const { REACT_APP_SSO_AUTHORITY, REACT_APP_SSO_DOMAIN, REACT_APP_SSO_CLIENT_ID } = process.env;
// Static oidc params for a single provider
const domain = REACT_APP_SSO_DOMAIN;
const authority = REACT_APP_SSO_AUTHORITY;
const client_id = REACT_APP_SSO_CLIENT_ID;
const post_logout_redirect_uri = `${domain}/`;
const redirect_uri = `${domain}/auth`;
const response_type = "id_token token";
const scope = "openid profile";

export const beginAuth = ({ state, nonce }) => {
  // Generate authentication URL
  const params = queryString.stringify({
    client_id,
    redirect_uri,
    response_type,
    scope,
    state,
    nonce,
  });
  const authUrl = `${authority}/auth?${params}`;

  // Attempt login by navigating to authUrl
  window.location.assign(authUrl);
};

export const logoutAuth = () => window.location.assign(`${authority}/logout`);
export const logoutAuthToken = ({ id_token_hint }) => {
  // Generate authentication URL
  const params = queryString.stringify({
    post_logout_redirect_uri,
    id_token_hint
  });
  const authUrl = `${authority}/logout?${params}`;

  // Attempt login by navigating to authUrl
  window.location.assign(authUrl);
};
