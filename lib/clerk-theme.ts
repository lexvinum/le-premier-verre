export const clerkAppearance = {
  variables: {
    colorPrimary: "#211d1a",
    colorBackground: "transparent",
    colorInputBackground: "transparent",
    colorInputText: "#211d1a",
    colorText: "#211d1a",
    colorTextSecondary: "#776d65",
    colorDanger: "#702f40",
    borderRadius: "0px",
    fontFamily: "var(--font-sans)",
    fontSize: "15px",
    spacingUnit: "4px",
  },

  elements: {
    rootBox: "w-full",
    cardBox: "w-full bg-transparent shadow-none",
    card: "w-full border-0 bg-transparent p-0 shadow-none",

    header: "mb-10 text-left",
    headerTitle:
      "lpv-display text-left text-5xl font-normal leading-[0.9] tracking-[-0.045em] text-[var(--lpv-ink)]",
    headerSubtitle:
      "mt-4 max-w-sm text-left text-sm leading-7 text-[var(--lpv-muted)]",

    socialButtonsBlockButton:
      "min-h-14 rounded-none border-x-0 border-t border-b border-[var(--lpv-line)] bg-transparent px-0 shadow-none transition-opacity hover:bg-transparent hover:opacity-50",
    socialButtonsBlockButtonText:
      "text-xs font-semibold uppercase tracking-[0.16em] text-[var(--lpv-ink)]",

    dividerRow: "my-9",
    dividerLine: "bg-[var(--lpv-line)]",
    dividerText:
      "px-4 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--lpv-muted)]",

    formFieldRow: "mb-8",
    formFieldLabel:
      "mb-3 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--lpv-muted)]",
    formFieldInput:
      "min-h-14 rounded-none border-x-0 border-t-0 border-b border-[var(--lpv-line)] bg-transparent px-0 text-base shadow-none outline-none focus:border-[var(--lpv-ink)] focus:ring-0",
    formFieldInputShowPasswordButton:
      "text-[var(--lpv-muted)] hover:text-[var(--lpv-ink)]",

    formButtonPrimary:
      "mt-3 min-h-13 rounded-full bg-[var(--lpv-ink)] text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--lpv-paper-light)] shadow-none transition-colors hover:bg-[var(--lpv-cocoa)]",

    identityPreview:
      "rounded-none border-y border-[var(--lpv-line)] bg-transparent px-0 py-5 shadow-none",
    identityPreviewText: "text-sm text-[var(--lpv-ink)]",
    identityPreviewEditButton:
      "text-[0.65rem] uppercase tracking-[0.14em] text-[var(--lpv-cocoa)]",

    footer:
      "mt-10 border-t border-[var(--lpv-line)] bg-transparent px-0 pt-7 shadow-none",
    footerAction: "justify-start",
    footerActionText: "text-sm text-[var(--lpv-muted)]",
    footerActionLink:
      "text-sm font-semibold text-[var(--lpv-ink)] underline underline-offset-4 hover:text-[var(--lpv-cocoa)]",

    formFieldErrorText:
      "mt-2 text-sm text-[var(--lpv-burgundy)]",
    alert:
      "rounded-none border border-[var(--lpv-line)] bg-transparent text-sm",
    formResendCodeLink:
      "text-sm font-semibold text-[var(--lpv-cocoa)]",
  },
};
