export const FieldErrorMessage = (fieldName: string) => {
  return {
    invalid_type_error: `Geçersiz ${fieldName.toLowerCase()}.`,
    required_error: `${fieldName} bilgisi gereklidir.`
  };
};
