import { db_crud } from "../db_crud.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM users";

    db_crud.query(q, (err, data) => { 
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};
