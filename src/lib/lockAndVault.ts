export type AutoLockMinutes = (typeof autoLockOptions)[number]["code"];

export const autoLockOptions = [
  {
    code: "1",
    label: "lock-and-vault-page.select-auto-lock-time.times.1-minute",
  },
  {
    code: "5",
    label: "lock-and-vault-page.select-auto-lock-time.times.5-minutes",
  },
  {
    code: "10",
    label: "lock-and-vault-page.select-auto-lock-time.times.10-minutes",
  },
  {
    code: "30",
    label: "lock-and-vault-page.select-auto-lock-time.times.30-minutes",
  },
  {
    code: "60",
    label: "lock-and-vault-page.select-auto-lock-time.times.1-hour",
  },
  { code: "0", label: "lock-and-vault-page.select-auto-lock-time.times.never" },
] as const;

export type LockOnMinimize = (typeof lockOnMinimizeOptions)[number]["code"];

export const lockOnMinimizeOptions = [
  {
    code: "true",
    label: "lock-and-vault-page.select-lock-on-minimize.options.true",
  },
  {
    code: "false",
    label: "lock-and-vault-page.select-lock-on-minimize.options.false",
  }
] as const;
