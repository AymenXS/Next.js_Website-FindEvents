import { connectDB, insertDocument, getAllDocuments } from '../../../helpers/db-util';

const handler = async (req, res) => {
  const eventID = req.query.eventID;

  let client = await connectDB();

  try {
    client = await connectDB();
  } catch (error) {
    return res.status(500).json({ message: 'Connecting to the database failed!' });
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
      res.status(422).json({ message: 'Invalid Input' });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventID,
    };

    let result;

    try {
      result = await insertDocument(client, 'comments', newComment);
      res.status(201).json({ message: 'Added Comment!', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting Comment Failed!' });
    }
  }

  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(
        client,
        'comments',
        { _id: -1 },
        { eventID: eventID }
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Getting Comments Failed' });
    }
  }

  client.close();
};
export default handler;
