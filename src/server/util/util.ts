import bcrypt from 'bcrypt';

export function cryptPassword(password: string,
    callback: (err: Error, encrypted?: string) => any): void {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return callback(err);

    bcrypt.hash(password, salt, (err, encrypted) => {
      return callback(err, encrypted);
    });
  });
};

export function comparePassword(plainPass: string, hashword: string,
    callback: (err: Error, same?: boolean) => any): void {
  bcrypt.compare(plainPass, hashword, (err, isPasswordMatch) => {
    return err == null ?
      callback(null, isPasswordMatch) :
      callback(err);
  });
};
