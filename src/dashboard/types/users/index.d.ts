declare namespace Entities {
  export type Userrole = "Admin" | "Moderator" | "User";

  export interface User extends Creatable {

    username: string;

    email: string;

    password: string;

    role: Userrole;

    firstName?: string;

    lastName?: string;

    picture_url?: string;

  }
}
