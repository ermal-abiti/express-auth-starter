import mongoose from 'mongoose';

const userModel = mongoose.model(
    'user',
    new mongoose.Schema(
        {
            username: {
                type: String,
                required: true,
                unique: true,
            },
            password: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
                unique: true,
            },
        },
        { timestamps: true, versionKey: false }
    )
);

export default userModel;
