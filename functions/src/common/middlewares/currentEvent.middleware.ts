import { NextFunction } from "express";
import { RequestUser } from "../interfaces/requestUser.interface";
import { EventsRepository } from "../../events/events.repository";
import express from "express";

export async function getCurrentEvent(req: RequestUser, res: express.Response, next: NextFunction) {
  const eventId: string = req.params.eventId || req.params.id;

  const eventRepository: EventsRepository = new EventsRepository();

  const event = await eventRepository.get(req.user.id, eventId);

  req.event = event;
  next();
}
