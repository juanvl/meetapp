import { Op } from 'sequelize';

import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';
import CreateSubscriptionService from '../services/CreateSubscriptionService';

import Cache from '../../lib/Cache';

class SubscriptionController {
  async index(req, res) {
    const cacheKey = `subscriptions:${req.userId}`;
    const cached = await Cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }

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

    await Cache.set(cacheKey, subscriptions);

    return res.json(subscriptions);
  }

  async store(req, res) {
    const user_id = req.userId;
    const meetup_id = req.body.meetupId;

    const subscription = await CreateSubscriptionService.run({
      user_id,
      meetup_id,
    });

    await Cache.invalidate(`subscriptions:${user_id}`);

    return res.json(subscription);
  }

  async delete(req, res) {
    const subscription = await Subscription.findByPk(req.params.id);

    await subscription.destroy();

    await Cache.invalidate(`subscriptions:${req.userId}`);

    return res.send();
  }
}

export default new SubscriptionController();
