/* eslint-disable new-cap */
import express from 'express';
import {addMember} from '../../db/db';
import {cryptPassword} from '../../util/util';

const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.username) {
    res.send({username: req.session.username});
  } else {
    res.send({error: 'not login'});
  }
});

router.post('/', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.sendStatus(400);
    return;
  }

  cryptPassword(password, (err, encrypted) => {
    if (err) {
      res.send({error: err});
      return;
    }

    const result = addMember(username, encrypted);
    if (result) {
      req.session.username = username;
      res.send({username: username});
    } else {
      res.send({error: 'User name already taken'});
    }
  });
});

router.delete('/', (req, res) => {
  req.session.destroy((err) => {});
  res.sendStatus(200);
});

export {router};
