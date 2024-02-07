import { sign } from './jwt/sign';
import { verify } from './jwt/verify';

const secret = '#ludmillo';

const data = {
  sub: '@felipe.oliveira',
};

const token = sign({
  exp: Math.floor(Date.now() / 1000 + 24 * 60 * 60),
  data,
  secret,
});

const payload = verify({
  token,
  secret,
});

console.info({
  data,
  token,
  payload,
});
