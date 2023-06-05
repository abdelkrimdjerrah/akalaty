declare namespace Entities {
  export interface PostEntity extends Creatable {
    _id: string;

    user: string;

    text: string;

    images?: [string];

    likes?: [string];

    comments?: [
      {
        user: string;
        comment: string;
      }
    ];

    createdAt?: Date;

    updatedAt?: Date;
  }
}
