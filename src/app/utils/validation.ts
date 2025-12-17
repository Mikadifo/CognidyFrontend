export function isStrongPassword(pwd: string): boolean {
  return (
    pwd.length >= 8 &&
    /[A-Z]/.test(pwd) &&   // at least 1 uppercase
    /[a-z]/.test(pwd) &&   // at least 1 lowercase
    /[0-9]/.test(pwd) &&   // at least 1 number
    /[!@#$%^&*(),.?":{}|<>]/.test(pwd) // at least 1 special char
  );
}
