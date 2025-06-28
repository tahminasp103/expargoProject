import bcrypt from 'bcryptjs';

const password = 'TT.TT.09222003';

bcrypt.hash(password, 10).then(hash => {
  console.log(hash);
});