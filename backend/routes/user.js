const express = require("express");

const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");


const signupSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});


router.post("/signup", async (req, res) => {
    // const body = req.body;
    const { success } = signupSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
                message: "Email already taken / Incorrect inputs"
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username
    });

    //user._id
    if(existingUser){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }

    const user = await User.create({
        username : req.body.username,
        firstName: req.body.firstName,
        lastName : req.body.lastName,
        password : req.body.password
    })

    const userId = user._id;
    // ------- Create new account --------
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    });

    const token = jwt.sign({
        userId
    }, JWT_SECRET);
    
    res.json({
        message: "User created successfully",
        token: token
    })

    // const username = req.body.username;
    // const firstName = req.body.firstName;
    // const lastName = req.body.lastName;
    // const password = req.body.password;

});

const signin = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

router.post("/signin",async (req, res) => {
    //destructuring the success and error here 
    const { success } = signin.safeParse(req.body);
    
    if(!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }
    
    //take input from client
    const username = req.body.username;
    const password = req.body.password;

    // if inputs are correct then check the user in DB
    const user = await User.findOne({
        username: username,
        password: password
    });

    // if user presents it should retrun token
    if(user) {
        const token = jwt.sign({userId: user._id}, JWT_SECRET);
        // const token = jwt.sign({
        //     userId: user._id
        // }, JWT_SECRET);
        // fetch()

        res.json({
            token: token,
            message: "logged in successfully"
        });
        return;
    }

    // if use not present return error
    res.status(411).json({
        message: "Error while logging in"
    });
});

const updateUser = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateUser.safeParse(req.body);

    if(!success) {
        return res.status(411).json({
            message: "Error while updating information"
        });
    }

    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated successfully"
    });
});

router.get("/bulk",async (req, res) => {
    const filter = req.query.filter || "";
    
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;