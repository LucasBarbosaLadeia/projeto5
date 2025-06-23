import { UserModel } from "../models/UserModel";

export const updateUserService = async (
  userId: string,
  authenticatedUserId: string,
  updateData: { name?: string; email?: string; password?: string; cpf?: string } // adiciona cpf aqui
) => {
  if (Number(userId) !== Number(authenticatedUserId)) {
    throw new Error("Você só pode editar seus próprios dados");
  }

  const user = await UserModel.findByPk(userId);
  if (!user) {
    const err: any = new Error("Usuário não encontrado");
    err.status = 404;
    throw err;
  }

  if (updateData.email && updateData.email !== user.email) {
    const err: any = new Error("Você não pode alterar seu e-mail");
    err.status = 403;
    throw err;
  }

  if (updateData.name) user.name = updateData.name;
  if (updateData.password) user.password = updateData.password;
  if (updateData.cpf) user.cpf = updateData.cpf;

  await user.save();
  return user;
};
