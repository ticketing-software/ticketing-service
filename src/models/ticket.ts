import mongoose from "mongoose";

// Given by user
interface TicketAttributes {
  title: string;
  price: number;
  userId: string;
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
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        // delete ret.userId;
      },
    },
  }
);

ticketSchema.statics.build = (attr: TicketAttributes) => {
  return new Ticket(attr);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
