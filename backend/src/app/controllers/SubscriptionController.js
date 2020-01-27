import { Op } from 'sequelize';

import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';
import CreateSubscriptionService from '../services/CreateSubscriptionService';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: { user_id: req.userId },
      include: [
        {
          model: Meetup,
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          required: true,
          include: [
            User,
            {
              model: File,
              as: 'file',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
      order: [[Meetup, 'date']],
    });
    return res.json(subscriptions);
  }

  async store(req, res) {
    const user_id = req.userId;
    const meetup_id = req.body.meetupId;

    const subscription = await CreateSubscriptionService.run({
      user_id,
      meetup_id,
    });

    return res.json(subscription);
  }

  async delete(req, res) {
    const subscription = await Subscription.findByPk(req.params.id);

    await subscription.destroy();

    return res.send();
  }
}

export default new SubscriptionController();
