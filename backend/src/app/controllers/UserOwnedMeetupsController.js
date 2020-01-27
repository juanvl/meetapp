import { isBefore, parseISO } from 'date-fns';

import Meetup from '../models/Meetup';

class UserOwnedMeetupsController {
  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: { user_id: req.userId },
      order: ['date'],
    });

    return res.json(meetups);
  }

  async update(req, res) {
    const { id } = req.params;
    const meetup = await Meetup.findByPk(id);

    if (!meetup) {
      return res.status(400).json({ error: 'meetup does not exist' });
    }

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({ error: 'You do not own this meetup' });
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Past dates not allowed' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't update past meetups" });
    }

    await meetup.update(req.body);

    return res.json(meetup);
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    if (meetup.user_id !== req.userId) {
      return res.status(401).json({ error: 'You do not own this meetup' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't delete past meetups" });
    }

    await meetup.destroy();

    return res.send();
  }
}

export default new UserOwnedMeetupsController();
