import { app } from "@/main";

export function Toast(
  title = "No Title",
  content = "body content",
  variant = "primary"
) {
  app.$bvToast.toast(content, {
    title: title,
    autoHideDelay: 3000,
    variant: variant,
  });
}
