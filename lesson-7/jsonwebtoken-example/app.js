import jwt from "jsonwebtoken";
import "dotenv/config";

const {JWT_SECRET} = process.env;

const payload = {
    id: "66686e8f87c911d81d20e007",
};

const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
// console.log(token);
const decodeToken = jwt.decode(token);
// console.log(decodeToken)

try {
    const {id} = jwt.verify(token, JWT_SECRET);
    // console.log(id)
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Njg2ZThmODdjOTExZDgxZDIwZTAwNyIsImlhdCI6MTcxODEyMDc0MSwiZXhwIjoxNzE4MjAzNTQxfQ.aLQApREjpfuyHn4MB923X1XLNpTYeTG-IIEZwki3eLy";
    jwt.verify(invalidToken, JWT_SECRET);
}
catch(error) {
    console.log(error.message);
}
