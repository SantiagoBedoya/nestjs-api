export const configuration = () => ({
  port: process.env.PORT,
  stage: process.env.STAGE,
  jwtSecret: process.env.JWT_SECRET,
});
