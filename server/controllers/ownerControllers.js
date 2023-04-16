const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Owner = require('../models/ownerModel');
const dotenv = require('dotenv');
dotenv.config();
const secret = process.env.JWT_SECRET;

module.exports.register = async (req, res, next) => {
    const { email, password } = req.body;
    
    try {
        const owner = await Owner.findOne({ email });
        if (owner) {
            return res.status(400).json({ message: 'Email already exists'});
        }

        const newOwner = new Owner({
            ...req.body,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        newOwner.password = await bcrypt.hash(password, salt);
        await newOwner.save();

        const payload = {
            owner: {
                id: newOwner.id
            },
        };

        jwt.sign(
            payload,
            secret,
            { expiresIn: '7 days' },
            (err, token ) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server Error'});
    }
};

module.exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        let owner = await Owner.findOne({ email });
        if (!owner) {
            return res.status(401).json({message: 'Email or Password is Incorrect'});
        }

        const isMatch = await bcrypt.compare(password, owner.password);
        if (!isMatch) {
            return res.status(401).json({message: 'Email or Password is Incorrect'});
        }

        const payload = {
            owner: {
                id: owner.id,
            },
        };

        jwt.sign(
            payload,
            secret,
            { expiresIn: '30 days' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message: 'Server Error'})
    }
}