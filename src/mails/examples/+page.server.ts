import { render } from "$lib";
import Mail from "./Mail.svelte";

export const load = async () => ({
  email: render(Mail, {}),
});
