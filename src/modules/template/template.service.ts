import { Template } from "./template.model.js";

const getTemplates = async () =>
  Template.find({ isActive: true }).sort({
    createdAt: -1,
  });

const getTemplateById = async (id: string) =>
  Template.findOne({
    _id: id,
    isActive: true,
  });

export const templateService = {
  getTemplates,
  getTemplateById,
};