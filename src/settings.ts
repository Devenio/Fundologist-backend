export const DATABASE_USERNAME =
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_USERNAME
    : 'root';

export const DATABASE_PASSWORD =
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_PASSWORD
    : '@Nima524';

export const DATABASE_NAME =
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_NAME
    : 'fundologist_db';

export const DATABASE_HOST =
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_HOST
    : 'localhost';

export const DATABASE_PORT =
  process.env.NODE_ENV === 'production'
    ? +process.env.DATABASE_PORT
    : 3306;
