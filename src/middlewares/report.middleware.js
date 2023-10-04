import { uploadPhoto } from '../utils/upload';

export const uploadImages = async (req, res, next) => {
  let { attachments } = req.files || [];
  if (!attachments)
    return res.status(400).json({ message: 'Please insert an image' });
  else {
    if (!Array.isArray(attachments)) attachments = [attachments];
    const att = [];
    for (let i = 0; i < attachments.length; i++) {
      const { url } = await uploadPhoto(req, res, attachments[i]);
      att.push(url);
    }
    req.body.attachments = att;
    next();
  }
};
