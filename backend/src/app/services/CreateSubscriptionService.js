import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';
import SubscriptionMail from '../jobs/SubscriptionMail';
import Queue from '../../lib/Queue';

class CreateSubscriptionService {
  async run({ user_id, meetup_id }) {
    const meetup = await Meetup.findByPk(meetup_id, { include: [User] });
    const user = await User.findByPk(user_id);

    if (!meetup) {
      throw new Error('Meetup does not exist');
    }

    if (user_id === meetup.user_id) {
      throw new Error('You can not subscribe to your own meetup');
    }

    if (meetup.past) {
      throw new Error('You can not subscribe to past meetups');
    }

    const checkDate = await Subscription.findOne({
      where: {
        user_id,
      },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (checkDate) {
      throw new Error(
        'Already subscribed to a meetup at the same date and time'
      );
    }

    const subscription = await Subscription.create({
      meetup_id,
      user_id,
    });

    await Queue.add(SubscriptionMail.key, {
      meetup,
      user,
    });

    return subscription;
  }
}

export default new CreateSubscriptionService();
