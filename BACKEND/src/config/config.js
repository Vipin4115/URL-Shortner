const isProd = process.env.NODE_ENV === "production";

export const cookieOptions = {
  httpOnly: true,
  sameSite: isProd ? "none" : "lax",
  secure: isProd,
  maxAge: 1000 * 60 * 60,
};
