import {
  Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure,
} from 'vee-validate';
import {
  required, min, max, alpha_spaces as alphaSpaces, email,
  min_value as minVal, max_value as maxVal, confirmed, not_one_of as excluded,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('tos', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('email', email);
    defineRule('min_value', minVal);
    defineRule('max_value', maxVal);
    defineRule('passwords_mismatch', confirmed);
    defineRule('excluded', excluded);
    defineRule('country_excluded', excluded);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${this.messageFieldHelper(ctx)} is required.`,
          min: `The field ${this.messageFieldHelper(ctx)} is too short.`,
          max: `The field ${this.messageFieldHelper(ctx)} is too long.`,
          alpha_spaces: `The field ${this.messageFieldHelper(ctx)} may only contain alphabetical characters and spaces.`,
          email: `The field ${this.messageFieldHelper(ctx)} must be a valid email.`,
          min_value: `The field ${this.messageFieldHelper(ctx)} is too low.`,
          max_value: `The field ${this.messageFieldHelper(ctx)} is too high.`,
          excluded: `You are not allowed to use this value for the field ${this.messageFieldHelper(ctx)}.`,
          country_excluded: 'Due to restrictions, we do not accept users from this location.',
          passwords_mismatch: "The passwords don't match.",
          tos: 'You must accept the Terms of Service.',
        };

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${this.messageFieldHelper(ctx)} is invalid.`;

        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
  messageFieldHelper(ctx) {
    switch (ctx.field) {
      case 'current_password':
        return 'Current Password';
      default:
        return ctx.field;
    }
  },
};
