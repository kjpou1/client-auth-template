import dotenv from 'dotenv';

dotenv.config();

export default class ConfigProvider {
  static get CONFIG() {
    return {
      apiURL: '$VUE_APP_API_URL',
      apiVersion: '$VUE_APP_API_VERSION',
    };
  }

  static value(name) {
    if (!(name in this.CONFIG)) {
      return null;
    }

    const configValue = this.CONFIG[name];

    if (!configValue) {
      return null;
    }

    if (configValue.startsWith('$VUE_APP_')) {
      const envName = configValue.substr(1);
      const envValue = process.env[envName];
      if (envValue) {
        return envValue;
      }
    } else {
      return configValue;
    }
    return null;
  }
}
