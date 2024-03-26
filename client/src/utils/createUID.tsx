import { customAlphabet } from "nanoid";

const alphaNums = "0123456789abcdefghijklmnopqrstuvwxyz";

export const createUID = () => customAlphabet(alphaNums, 12)();
