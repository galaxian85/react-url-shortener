/* eslint-disable new-cap */
import express from 'express';
import {getMember} from '../../db/db';
import {comparePassword} from '../../util/util';

const router = express.Router();
router.post('/', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    res.send(400);
    return;
  }

  const member = getMember(username);
  if (!member) {
    res.send({error: 'No such user!'});
    return;
  }

  comparePassword(password, member.password, (err, same) => {
    if (err) {
      res.send({error: err});
      return;
    }

    if (same) {
      req.session.username = username;
      res.send({username: username});
    } else {
      res.send({error: 'Wrong password!'});
    }
  });
});

export {router};
