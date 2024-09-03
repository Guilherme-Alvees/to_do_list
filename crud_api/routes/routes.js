import express from "express"
import { 
    getUsers,
    postUsers
} from "../controllers/user.js"
import { 
    postTask
} from "../controllers/task.js"

const router = express.Router()

//Users
router.get("/authentication", getUsers)
router.post("/authentication", postUsers)

//Taks
router.post("/tasks", postTask)

export default router