import queryString from "query-string";


// Static oidc params for a single provider
const domain = process.env.REACT_APP_SSO_DOMAIN;
const authority = process.env.REACT_APP_SSO_AUTHORITY;
const client_id = process.env.REACT_APP_SSO_CLIENT_ID;
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
