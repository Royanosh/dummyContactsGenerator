import { Schema, model } from "mongoose";

const contactSchema = new Schema(
	{
		properties: [{
            _id: false,
            name: String,
            value: Schema.Types.Mixed,
            label: String
        }],
        adhocProperties: [{
            _id: false,
            name: String,
            value: String,
            label: String
        }],
        source: [{
            type: Schema.Types.ObjectId // source changed to array of objects 
        }],
        subaccount: {
            type: Schema.Types.ObjectId,
            ref: "Subaccount"
        },
        role: {
            type: String,
            enum: ["customer", "lead"]
        },
        metadata:{
            stripeCustomerId:{
                type:String
            }
        }
	},
	{ timestamps: true }
);

export const Contact = model("Contact", contactSchema);