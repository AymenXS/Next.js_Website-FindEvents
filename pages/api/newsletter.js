import { connectDB, insertDocument } from '../../helpers/db-util';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      return res.status(422).json({ message: 'Invalid Email Address.' });
    }

    let client;

    try {
      client = await connectDB();
    } catch (error) {
      return res.status(500).json({ message: 'Connecting to the database failed!' });
    }

    try {
      await insertDocument(client, 'newsletter', { email: userEmail });
      client.close();
    } catch (error) {
      return res.status(500).json({ message: 'Inserting Data Failed' });
    }

    res.status(201).json({ message: 'Signed Up!' });
  }
};
export default handler;
