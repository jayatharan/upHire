import mongoose from "mongoose";

const DateDurationSchema = new mongoose.Schema({
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    }
})

export default DateDurationSchema;