import mongoose from "mongoose";

export interface DateDuration {
    startDate?: Date;
    endDate?: Date;
}

const DateDurationSchema = new mongoose.Schema({
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    }
})

export default DateDurationSchema;