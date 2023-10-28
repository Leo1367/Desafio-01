import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({

    title:{
        type: String,
    },
    description: {
        type: String,
    },
    completed_at: {
        type: Date,
        default: null,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    update_at: {
        type: Date,
        default: null,
    },
});

export default mongoose.model('Task', TaskSchema);
