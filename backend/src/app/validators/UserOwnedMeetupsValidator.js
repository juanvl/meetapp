import * as Yup from 'yup';

export async function update(req, res, next) { // eslint-disable-line
  try {
    const schema = Yup.object().shape({
      title: Yup.string(),
      file_id: Yup.number(),
      desc: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Invalid/Missing data in form', messages: error.inner });
  }
}
