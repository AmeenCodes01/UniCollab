export const emailInterest = (ideaTitle: string, email: string) => {
  const subject = encodeURIComponent(
    `Interested in joining project ${ideaTitle} `
  );
  window.location.href = `mailto:${email}?subject=${subject}`;
};
