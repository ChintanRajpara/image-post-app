import { customAlphabet } from "nanoid";

const alphaNums = "0123456789abcdefghijklmnopqrstuvwxyz";

export const createUID = (): string => customAlphabet(alphaNums, 12)();

export const createAppRequestId = (): { appRequestId: string } => ({
  appRequestId: createUID(),
});
