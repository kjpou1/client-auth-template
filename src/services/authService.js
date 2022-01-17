import Configuration from '@/helpers/ConfigProvider';

const API_VERSION = Configuration.value('apiVersion');
const API_URL = `${Configuration.value('apiURL')}${API_VERSION}/`;

// Read #9 in this article: https://auth0.com/blog/ten-things-you-should-know-about-tokens-and-cookies/
// https://security.stackexchange.com/questions/108662/why-is-bearer-required-before-the-token-in-authorization-header-in-a-http-re
class AuthService {
  static accessToken = null

  static tokenType = null

  static expiresIn = 0;

  static user = null

  static currentRefreshPollingTimer = null;

  static getAuthHeader() {
    return `${this.tokenType} ${this.accessToken}`;
  }

  static setTokenInformation(response) {
    if (response?.status === 200) {
      const { details } = response;
      this.user = details?.user;
      this.accessToken = details?.access_token;
      this.expiresIn = details?.expiresIn;
      this.tokenType = details?.tokenType;
      // this.expiresIn = 8;
      this.setAuthTokenId(details?.jti);
      // Now set up silent refresh polling again
      this.refreshPolling();
    } else {
      this.removeAuthTokenId();
    }
  }

  static async signIn(user) {
    const response = await fetch(`${API_URL}login`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.tokenType} ${this.accessToken}`,
      },
    });
    const tokenRequestInfo = await response.json();
    this.setTokenInformation(tokenRequestInfo);
    return tokenRequestInfo;
  }

  static async register(user) {
    const response = await fetch(`${API_URL}register`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
        roles: ['User', 'Admin'],
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.tokenType} ${this.accessToken}`,
      },
    });
    return response.json();
  }

  static setAuthTokenId(tokenId) {
    window.sessionStorage.setItem('tokenId', tokenId);
  }

  static removeAuthTokenId() {
    window.sessionStorage.removeItem('tokenId');
  }

  static async signout() {
    const response = await fetch(`${API_URL}logout`, {
      method: 'POST',
      credentials: 'include',
      body: '{}',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.tokenType} ${this.accessToken}`,
      },
    });
    this.removeAuthTokenId();
    return response.json();
  }

  static async forgot(payload) {
    const response = await fetch(`${API_URL}request_reset`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        email: payload.values?.email,
        resetURL: payload.resetURL,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.tokenType} ${this.accessToken}`,
      },
    });
    return response.json();
  }

  static async resetPassword(payload) {
    const { requestId } = payload?.params;
    console.log(payload);
    const response = await fetch(`${API_URL}reset/${requestId}`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        password: payload?.values?.password,
        passwordConfirm: payload?.values?.confirm_password,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.tokenType} ${this.accessToken}`,
      },
    });
    return response.json();
  }

  static async getAuthToken() {
    const currentTokenId = window.sessionStorage.getItem('tokenId');
    if (currentTokenId) {
      const response = await fetch(`${API_URL}token/${currentTokenId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${this.tokenType} ${this.accessToken}`,
        },
      });
      const tokenRequestInfo = await response.json();
      this.setTokenInformation(tokenRequestInfo);
      return this.user;
    }
    return null;
  }

  static refreshPolling() {
    // Stop any existing polling if any
    if (this.currentRefreshPollingTimer) {
      clearTimeout(this.currentRefreshPollingTimer);
    }
    if (this.refreshToken) {
      this.currentRefreshPollingTimer = setTimeout(async () => {
        await this.refreshToken();
      }, (this.expiresIn * 1000) - 500);
    }
  }

  static async refreshToken() {
    const refreshTokenResponse = await fetch(`${API_URL}token`, {
      method: 'POST',
      credentials: 'include',
      body: '{}',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${this.tokenType} ${this.accessToken}`,
      },
    });
    const refreshTokenRequestInfo = await refreshTokenResponse.json();
    this.setTokenInformation(refreshTokenRequestInfo);
    return null;
  }
}

export default AuthService;
