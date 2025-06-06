import { Router } from 'express';
import { validateAuthBody } from '../middlewares/validators.js';
import { getUser, registerUser } from '../services/users.js';
import { v4 as uuid } from 'uuid';

const router = Router();

router.get('/logout', (req, res, next) => {
    if(global.user) {
        global.user = null;
        res.json({
            success: true,
            message: 'User logged out successfully'
        });
    } else {
        next({
            status: 400,
            message: 'No user is currently logged in'
        });
    }
});

router.post('/register', validateAuthBody, async (req, res) => {
    const { username, password } = req.body;
    const userType = 'user';
    const result = await registerUser({
        username: username,
        password : password,
        role : userType,
        userId : `${userType}-${uuid().substring(0, 5)}`
    });
    if(result) {
        res.status(201).json({
            success : true,
            message : 'New user registered successfully'
        });
    } else {
        res.status(400).json({
            success: false,
            message : 'Registration unsuccessful'
        });
    }
});

router.post('/login', validateAuthBody, async (req, res) => {
    const { username, password } = req.body;
    const user = await getUser(username);
    if(user) {
        if(user.password === password) {
            global.user = user;
            res.json({
                success : true,
                message : 'User logged in successfully'
            });
        } else {
            res.status(400).json({
                success : false,
                message : 'Incorrect username and/or password'
            });
        }
    } else {
        res.status(400).json({
            success : false,
            message : 'No user found'
        });
    }
});

export default router;