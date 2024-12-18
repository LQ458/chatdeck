export interface ValidationErrors {
  [key: string]: string;
}

export interface AuthError {
  type: "validation" | "general";
  errors?: ValidationErrors;
  message?: string;
}
