import mongoose from "mongoose";
import request from "supertest";

import app from "../server.js";

import { findUser, deleteAllUser } from "../services/authServices.js";

const {TEST_DB_HOST, PORT = 3000} = process.env;

describe("test /api/auth/signup route", ()=> {
    let server = null;
    beforeAll(async()=> {
        await mongoose.connect(TEST_DB_HOST);
        server = app.listen(PORT);
    })

    afterAll(async()=> {
        await mongoose.connection.close();
        server.close();
    })

    afterEach(async()=> {
        await deleteAllUser();
    })

    test("signup with correctData", async()=> {
        const signupData = {
            username: "Bogdan",
            email: "bogdan@gmail.com",
            password: "123456"
        };

        const {statusCode, body} = await request(app).post("/api/auth/signup").send(signupData);
        expect(statusCode).toBe(201);
        expect(body.username).toBe(signupData.username);
        expect(body.email).toBe(signupData.email);

        const user = await findUser({email: signupData.email});
        expect(user).toBeTruthy();
        expect(user?.username).toBe(signupData.username);
        expect(user?.email).toBe(signupData.email);
    })
})