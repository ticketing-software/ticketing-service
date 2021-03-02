import { Mongoose } from "mongoose";
import mongoose from "mongoose";

// Given by user
interface TicketAttributes {
  name: string;
  price: number;
  userId?: string;
}

// What attributes does Ticket Model have
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  createdAt: string;
  userId: string;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttributes): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: [String],
      required: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ticketSchema.statics.build = (attr: TicketAttributes) => {
  return new Ticket(attr);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
