export const FieldErrorMessage = (fieldName: string) => {
  return {
    invalid_type_error: `${fieldName} bilgisi gereklidir.`,
    required_error: `${fieldName} bilgisi gereklidir.`
  };
};
