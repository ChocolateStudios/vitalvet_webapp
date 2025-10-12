declare namespace App {
    interface Locals {
        authenticatedUserId: string;
    }
}

interface ValidationRule {
  validate: (value: any) => boolean;
  message: string;
}

interface ValidationRules {
  [key: string]: ValidationRule[];
}

interface HTMLFormElement {
  validationRules?: ValidationRules;
}