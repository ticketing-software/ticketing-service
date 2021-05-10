import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@achyuthtickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
