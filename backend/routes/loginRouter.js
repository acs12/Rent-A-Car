const express = require('express');

const loginRouter = express.Router();


loginRouter.post('/', async (req,res)=>{
    
        let user = await User.findOne({ username: req.body.username });
        if (!user) {
          return res
            .status(401)
            .json({ errors: [{ msg: 'Username not found' }] });
        }

    if (req.body.password === user.password){
        res.status(200).json(user);
    }

    else{
        return res
          .status(403)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
    });
module.exports = loginRouter;