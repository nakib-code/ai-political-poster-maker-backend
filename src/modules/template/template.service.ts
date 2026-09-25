import { Template } from "./template.model.js";

export const getTemplates = async () => {
  return Template.find({ isActive: true }).sort({
    createdAt: -1,
  });
};

export const getTemplateById = async (id: string) => {
  return Template.findOne({
    _id: id,
    isActive: true,
  });
};