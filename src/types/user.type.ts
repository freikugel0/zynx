export type User = {
  id: number;
  email: string;
  username: string;
  slug: string;
  fullName: string;
  position: string | null;
  phone: string | null;
  photo: string | null;
  isVerified: boolean;
  verificationToken: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserMeResponse = Pick<
  User,
  "id" | "email" | "username" | "fullName" | "slug" | "createdAt"
>;
