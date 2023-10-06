import { uploadPhoto } from '../utils/upload';

export const uploadImages = async (req, res, next) => {
  let { attachments } = req.files || [];
  const att = [];
  if (attachments) {
    if (!Array.isArray(attachments)) attachments = [attachments];
    for (let i = 0; i < attachments.length; i++) {
      const { url } = await uploadPhoto(req, res, attachments[i]);
      att.push(url);
    }
  }
  req.body.attachments = att;
  next();
};
