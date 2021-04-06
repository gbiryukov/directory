export function isRequired(value?: string): string | void {
  if (!value) {
    return 'This field is required';
  }
}
