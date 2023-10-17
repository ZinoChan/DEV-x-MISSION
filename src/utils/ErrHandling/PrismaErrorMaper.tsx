export default function prismaErrorMsg(message: string) {
  const lines = message.split('\n');
  const userFriendlyError = lines[lines.length - 1].trim();
  return userFriendlyError;
}
