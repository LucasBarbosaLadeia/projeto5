import UserModel from "../models/UserModel";

export const updateUserService = async (
  userId: string,
  authenticatedUserId: string,
  updateData: { name?: string; email?: string; password?: string }
) => {
  if (String(userId) !== String(authenticatedUserId)) {
    throw new Error("Você só pode editar seus próprios dados");
  }
  const user = await UserModel.findByPk(userId);
  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  if (updateData.email && updateData.email !== user.email) {
    throw new Error("Você não pode alterar seu e-mail");
  }

  if (updateData.name) user.name = updateData.name;
  if (updateData.password) user.password = updateData.password;

  await user.save();
  return user;
};
